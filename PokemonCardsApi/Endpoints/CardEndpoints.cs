using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

public static class CardEndpoints
{
    public static void MapCardEndpoints(this WebApplication app)
    {
        app.MapGet("/api/cards", async (
            AppDbContext db, 
            [FromServices] IMapper mapper, 
            int limit = 20, 
            int offset = 0,
            int? setId = null,
            int? cardTypeId = null,
            int? locationId = null,
            int? pokemonSpeciesId = null,
            int? variantTypeId = null,
            int? trainerSubtypeId = null,
            int? energySubtypeId = null,
            int? pokemonTrainerId = null,
            int? cardLanguageId = null) => 
        {
            var query = db.PokemonCards
                .Include(c => c.CardType)
                .Include(c => c.CardSet)
                .Include(c => c.Location)
                .Include(c => c.CardLanguage)
                .Include(c => c.VariantType)
                .Include(c => c.TrainerSubtype)
                .Include(c => c.EnergySubtype)
                .Include(c => c.PokemonTrainer)
                .Include(c => c.CardLanguage)
                .AsQueryable();
            
            if (setId.HasValue)
            {
                query = query.Where(c => c.CardSetId == setId!.Value);
            }

            if (cardTypeId.HasValue)
            {
                query = query.Where(c => c.CardTypeId == cardTypeId!.Value);
            }

            if (locationId.HasValue)
            {
                query = query.Where(c => c.LocationId == locationId!.Value);
            }

            if (pokemonSpeciesId.HasValue)
            {
                query = query.Where(c => c.PokemonSpeciesId == pokemonSpeciesId.Value);
            }

            if (variantTypeId.HasValue)
            {
                query = query.Where(c => c.VariantTypeId == variantTypeId.Value);
            }

            if (trainerSubtypeId.HasValue)
            {
                query = query.Where(c => c.TrainerSubtypeId == trainerSubtypeId);
            }

            if (energySubtypeId.HasValue)
            {
                query = query.Where(c => c.EnergySubtypeId == energySubtypeId);
            }

            if (pokemonTrainerId.HasValue)
            {
                query = query.Where(c => c.PokemonTrainerId == pokemonTrainerId);
            }

            if (cardLanguageId.HasValue)
            {
                query = query.Where(c => c.CardLanguageId == cardLanguageId);
            }

            var pokemonCards = await query
                .OrderBy(c => c.CardSet != null ? c.CardSet.Id : 0)
                .ThenBy(c => c.CardNumber)
                .ThenBy(c => c.Location)
                .ThenBy(c => c.Id)
                .Skip(offset)
                .Take(limit)
                .ToListAsync();

            var dtoCards = mapper.Map<List<PokemonCardDto>>(pokemonCards);

            return Results.Ok(dtoCards);
        });
    }
}
