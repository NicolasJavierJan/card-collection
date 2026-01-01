using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class PokemonCardEndpoints
{
    public static void MapPokemonCardEndpoints(this WebApplication app)
    {
        app.MapGet("/api/pokemon-cards", async (
            AppDbContext db,
            IMapper mapper,
            int offset = 0,
            int limit = 50
        ) =>
        {
            var cards = await db.PokemonCards
                .Include(c => c.PokemonSpecies)
                .Include(c => c.VariantType)
                .Include(c => c.CardType)
                .Include(c => c.CardSet)
                .Include(c => c.Location)
                .Include(c => c.TrainerSubtype)
                .Include(c => c.EnergySubtype)
                .Include(c => c.PokemonTrainer)
                .Include(c => c.CardLanguage)
                .OrderBy(c => c.CardNumber)
                .Skip(offset)
                .Take(limit)
                .AsNoTracking()
                .ToListAsync();

            var dtos = mapper.Map<List<PokemonCardDto>>(cards);
            return Results.Ok(dtos);
        });

        app.MapGet("/api/pokemon-cards/{id}", async (
            Guid id,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var card = await db.PokemonCards
                .Include(c => c.PokemonSpecies)
                .Include(c => c.VariantType)
                .Include(c => c.CardType)
                .Include(c => c.CardSet)
                .Include(c => c.Location)
                .Include(c => c.TrainerSubtype)
                .Include(c => c.EnergySubtype)
                .Include(c => c.PokemonTrainer)
                .Include(c => c.CardLanguage)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (card == null)
                return Results.NotFound(new { error = "Card not found." });

            var dto = mapper.Map<PokemonCardDto>(card);
            return Results.Ok(dto);
        });

        app.MapPost("/api/pokemon-cards", async (
            PokemonCardCreateDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            if (string.IsNullOrWhiteSpace(dto.CardName))
                return Results.BadRequest(new { error = "CardName is required." });

            var card = mapper.Map<PokemonCard>(dto);
            card.Id = Guid.NewGuid();
            card.AddedAt = DateTime.UtcNow;

            db.PokemonCards.Add(card);
            await db.SaveChangesAsync();

            var createdCard = await db.PokemonCards
                .Include(c => c.PokemonSpecies)
                .Include(c => c.VariantType)
                .Include(c => c.CardType)
                .Include(c => c.CardSet)
                .Include(c => c.Location)
                .Include(c => c.TrainerSubtype)
                .Include(c => c.EnergySubtype)
                .Include(c => c.PokemonTrainer)
                .Include(c => c.CardLanguage)
                .AsNoTracking()
                .FirstAsync(c => c.Id == card.Id);

            var resultDto = mapper.Map<PokemonCardDto>(createdCard);
            return Results.Created($"/api/cards/{card.Id}", resultDto);
        });

        app.MapPut("/api/pokemon-cards/{id}", async (
            Guid id,
            PokemonCardUpdateDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var card = await db.PokemonCards
                .FirstOrDefaultAsync(c => c.Id == id);

            if (card == null)
                return Results.NotFound(new { error = "Card not found." });

            mapper.Map(dto, card);
            await db.SaveChangesAsync();

            var updatedCard = await db.PokemonCards
                .Include(c => c.PokemonSpecies)
                .Include(c => c.VariantType)
                .Include(c => c.CardType)
                .Include(c => c.CardSet)
                .Include(c => c.Location)
                .Include(c => c.TrainerSubtype)
                .Include(c => c.EnergySubtype)
                .Include(c => c.PokemonTrainer)
                .Include(c => c.CardLanguage)
                .AsNoTracking()
                .FirstAsync(c => c.Id == card.Id);

            var resultDto = mapper.Map<PokemonCardDto>(updatedCard);
            return Results.Ok(resultDto);
        });

        app.MapDelete("/api/pokemon-cards/{id}", async (
            Guid id,
            AppDbContext db
        ) =>
        {
            var card = await db.PokemonCards
                .FirstOrDefaultAsync(c => c.Id == id);

            if (card == null)
                return Results.NotFound(new { error = "Card not found." });

            db.PokemonCards.Remove(card);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}
