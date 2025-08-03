using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

public static class CardDex
{
    public static void MapCardDex(this WebApplication app)
    {
        app.MapGet("/api/cardDex", async(
            AppDbContext db,
            [FromServices] IMapper mapper,
            int limit = 20,
            int offset = 0) => 
        {
            const int CardDexLocationId = 2;
            const int CardTypeId = 1;
            const string CardBackPlaceholderPath = "/back/card-back.png";

            var allSpecies = await db.PokemonSpecies
                .Select(s => new { s.Id, s.Name })
                .ToListAsync();
            
            var cardDexCards = await db.PokemonCards
                .Where(c => c.LocationId == CardDexLocationId && c.CardTypeId == CardTypeId)
                .Include(c => c.PokemonSpecies)
                .ToListAsync();
            
            var cardsBySpecies = cardDexCards
                .Where(c => c.PokemonSpeciesId.HasValue)
                .GroupBy(c => c.PokemonSpeciesId!.Value)
                .ToDictionary(g => g.Key, g => g.First());
            
            var results = new List<CardDexEntryDto>();

            foreach (var species in allSpecies)
            {
                if (cardsBySpecies.TryGetValue(species.Id, out var card))
                {
                    var dto = mapper.Map<CardDexEntryDto>(card);
                    dto.IsMissing = false;
                    results.Add(dto);
                }
                else
                {
                    results.Add(new CardDexEntryDto
                    {
                        Id = species.Id,
                        Name = species.Name,
                        ImagePath = CardBackPlaceholderPath,
                        IsMissing = true
                    });
                }
            }

            return Results.Ok(
                results
                .OrderBy(r => r.Id)
                .Skip(offset)
                .Take(limit));
        });

        app.MapGet("/api/cardDex/recommendations", async (
            AppDbContext db,
            [FromServices] IMapper mapper) =>
        {
            const int CardDexLocationId = 2;
            const int CardTypeId = 1;

            var speciesInDex = await db.PokemonCards
                .Where(c => c.LocationId == CardDexLocationId && c.CardTypeId == CardTypeId && c.PokemonSpeciesId != null)
                .Select(c => c.PokemonSpeciesId)
                .Where(id => id != null)
                .Distinct()
                .ToListAsync();
            
            var recommendations = await db.PokemonCards
                .Where(c => c.LocationId != CardDexLocationId &&
                            c.CardTypeId == CardTypeId &&
                            c.PokemonSpeciesId != null &&
                            !speciesInDex.Contains(c.PokemonSpeciesId.Value))
                .Include(c => c.PokemonSpecies)
                .Include(c => c.Location)
                .Include(c => c.CardSet)
                .Include(c => c.CardType)
                .Include(c => c.CardLanguage)
                .Include(c => c.VariantType)
                .Include(c => c.TrainerSubtype)
                .Include(c => c.EnergySubtype)
                .Include(c => c.PokemonTrainer)
                .ToListAsync();

            var mapped = mapper.Map<List<PokemonCardDto>>(recommendations);
            
            return Results.Ok(mapped);
        });
    }
}