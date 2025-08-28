using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class CardsEndpoints
{
    public static void MapCardsEndpoints(this WebApplication app)
    {
        app.MapPost("/api/cards", async (
            NewCardDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var card = mapper.Map<PokemonCard>(dto);

            card.Id = Guid.NewGuid();

            db.PokemonCards.Add(card);
            await db.SaveChangesAsync();

            var result = mapper.Map<PokemonCardDto>(card);
            return Results.Created($"/api/cards/{card.Id}", result);
        });
    }
}
