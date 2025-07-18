using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

public static class CardEndpoints
{
    public static void MapCardEndpoints(this WebApplication app)
    {
        app.MapGet("/api/cards", async (AppDbContext db, [FromServices] IMapper mapper, int limit = 20, int offset = 0) => 
        {
            var pokemonCards = await db.PokemonCards
                .Include(c => c.CardType)
                .Include(c => c.CardSet)
                .Include(c => c.Location)
                .OrderBy(c => c.CardSet)
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
