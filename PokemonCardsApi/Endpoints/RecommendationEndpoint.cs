using Microsoft.EntityFrameworkCore;

public static class CardRecommendationEndpoint
{
    public static void MapCardRecommendationEndpoint(this WebApplication app)
    {
        app.MapPost("/api/add-card/card-recommendation", async (
            HttpContext context,
            AppDbContext db
        ) =>
        {
            var card = await context.Request.ReadFromJsonAsync<CardDto>();
            if (card == null)
                return Results.BadRequest(new { error = "Invalid card data" });

            if (card.PokemonSpeciesId.HasValue)
            {
                bool existsInDex = await db.PokemonCards
                    .Include(c => c.Location)
                    .AnyAsync(c => c.PokemonSpeciesId == card.PokemonSpeciesId.Value &&
                    c.Location!.Type == LocationType.CardDex);

                if (!existsInDex)
                {
                    return Results.Ok(new
                    {
                        recommendation = "CardDex",
                        message = "This is a new Pokémon species. Recommend adding it to your CardDex."
                    });
                }
            }

            bool existsInBinder = await db.PokemonCards
                .Include(c => c.Location)
                .AnyAsync(c =>
                    c.CardSetId == card.CardSetId &&
                    c.CardNumber == card.CardNumber &&
                    c.PokemonSpeciesId == card.PokemonSpeciesId && 
                    c.Location != null &&
                    c.Location.Type == LocationType.Binder
                );

            if (!existsInBinder)
            {
                var binderLocation = await db.CardSetLocations
                    .Where(csl => csl.CardSetId == card.CardSetId)
                    .Select(csl => csl.Location)
                    .Where(loc => loc.Type == LocationType.Binder)
                    .FirstOrDefaultAsync();

                return Results.Ok(new
                {
                    recommendation = "Binder",
                    message = binderLocation != null
                        ? $"This card isn't in your binder yet. Recommend placing it in Binder '{binderLocation.Name}'."
                        : "This card isn't in any binder yet. Recommend placing it in a binder."
                });
            }
            
            var boxLocation = await db.CardSetLocations
                .Where(csl => csl.CardSetId == card.CardSetId)
                .Select(csl => csl.Location)
                .Where(loc => loc.Type == LocationType.Box)
                .FirstOrDefaultAsync();

            return Results.Ok(new
            {
                recommendation = "BTB",
                message = boxLocation != null
                    ? $"This card is a duplicate. Recommend storing it in Box '{boxLocation.Name}'."
                    : "This card is a duplicate. Recommend storing it in a Box (set does not exist in any box yet)."
            });
        });
    }
}

public class CardDto
{
    public required string CardName { get; set; }
    public int CardTypeId { get; set; }
    public int? PokemonSpeciesId { get; set; }
    public int? VariantTypeId { get; set; }
    public int? TrainerSubtypeId { get; set; }
    public int? EnergySubtypeId { get; set; }
    public int? PokemonTrainerId { get; set; }
    public int CardSetId { get; set; }
    public required int CardNumber { get; set; }
    public bool FirstEdition { get; set; }
    public int CardLanguageId { get; set; }
    public int LocationId { get; set; }
    public string? ImagePath { get; set; }
}
