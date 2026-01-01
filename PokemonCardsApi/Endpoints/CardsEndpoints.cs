/* using AutoMapper;
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

        app.MapGet("/api/cards/{id}", async (
            Guid id,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var card = await db.PokemonCards
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (card == null)
            {
                return Results.NotFound(new { error = "Card not found" });
            } 

            var editableCardDto = new EditableCardDto
            {
                Id = card.Id,
                CardName = card.CardName,
                PokemonSpeciesId = card.PokemonSpeciesId,
                VariantTypeId = card.VariantTypeId,
                CardTypeId = card.CardTypeId,
                CardSetId = card.CardSetId,
                CardNumber = card.CardNumber,
                FirstEdition = card.FirstEdition,
                LocationId = card.LocationId,
                TrainerSubtypeId = card.TrainerSubtypeId,
                EnergySubtypeId = card.EnergySubtypeId,
                PokemonTrainerId = card.PokemonTrainerId,
                CardLanguageId = card.CardLanguageId,
                ImagePath = card.ImagePath
            };

            return Results.Ok(editableCardDto);
        });
    }
}

public class EditableCardDto
{
    public Guid Id { get; set; }
    public string? CardName { get; set; }
    public int? PokemonSpeciesId { get; set; }
    public int? VariantTypeId { get; set; }
    public int? CardTypeId { get; set; }
    public int? CardSetId { get; set; }
    public int CardNumber { get; set; }
    public bool? FirstEdition { get; set; }
    public int? LocationId { get; set; }
    public int? TrainerSubtypeId { get; set; }
    public int? EnergySubtypeId { get; set; }
    public int? PokemonTrainerId { get; set; }
    public int? CardLanguageId { get; set; }
    public string? ImagePath { get; set; }
}
 */