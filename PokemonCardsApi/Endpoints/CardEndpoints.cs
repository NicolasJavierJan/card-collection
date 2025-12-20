using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

public static class CardEndpoints
{
    public static void MapCardEndpoints(this WebApplication app)
    {
        app.MapGet("/api/collection", async (
            AppDbContext db,
            [FromServices] IMapper mapper,
            int limit = 20,
            int offset = 0,
            int? setId = null,
            int? locationId = null,
            int? pokemonSpeciesId = null,
            int? cardLanguageId = null) =>
        {
            var query = db.PokemonCards
                .Include(c => c.CardSet)
                .Include(c => c.Location)
                .Include(c => c.CardLanguage)
                .AsQueryable();

            if (setId.HasValue)
                query = query.Where(c => c.CardSetId == setId.Value);

            if (locationId.HasValue)
                query = query.Where(c => c.LocationId == locationId.Value);

            if (pokemonSpeciesId.HasValue)
                query = query.Where(c => c.PokemonSpeciesId == pokemonSpeciesId.Value);

            if (cardLanguageId.HasValue)
                query = query.Where(c => c.CardLanguageId == cardLanguageId.Value);

            var pokemonCards = await query
                .OrderBy(c => c.CardSetId)
                .ThenBy(c => c.CardNumber)
                .ThenBy(c => c.Id)
                .Skip(offset)
                .Take(limit)
                .ToListAsync();

            var dtoCards = mapper.Map<List<PokemonCardCollectionDto>>(pokemonCards);
            return Results.Ok(dtoCards);
        });
    }
}
