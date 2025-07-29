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
                .GroupBy(c => c.PokemonSpeciesId)
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

            return Results.Ok(results.OrderBy(r => r.Id));
        });
    }
}