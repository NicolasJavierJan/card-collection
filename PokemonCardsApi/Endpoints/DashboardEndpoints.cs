/* using Microsoft.EntityFrameworkCore;

public static class DashboardEndpoints
{
    private const int CardDexLocationId = 2; // change if needed

    public static void MapDashboardEndpoints(this WebApplication app)
    {
        app.MapGet("/api/dashboard", async (AppDbContext db) =>
        {
            // ----------------------------
            // BASIC COUNTS
            // ----------------------------
            var totalCards = await db.PokemonCards.CountAsync();
            var totalSets  = await db.CardSets.CountAsync();

            var cardsInDex = await db.PokemonCards
                .Where(c => c.LocationId == CardDexLocationId)
                .CountAsync();

            // ----------------------------
            // SET OVERVIEW
            // ----------------------------
            var sets = await db.CardSets
                .Include(s => s.CardSetLocations)
                    .ThenInclude(csl => csl.Location)
                .Select(s => new SetOverviewDto
                {
                    SetId = s.Id,
                    Name = s.Name,

                    Binder = s.CardSetLocations
                        .Where(x => x.Location.Type == LocationType.Binder)
                        .Select(x => x.Location.Name)
                        .FirstOrDefault(),

                    Box = s.CardSetLocations
                        .Where(x => x.Location.Type == LocationType.Box)
                        .Select(x => x.Location.Name)
                        .FirstOrDefault(),

                    TotalCards = db.PokemonCards.Count(c => c.CardSetId == s.Id),
                    MissingCards = s.CardTotal 
                        - db.PokemonCards.Count(c => c.CardSetId == s.Id)
                })
                .OrderBy(s => s.Name)
                .ToListAsync();

            // ----------------------------
            // RECENT CARDS (using ctid trick)
            // ----------------------------
            var recentCards = await db.PokemonCards
    .OrderByDescending(c => c.AddedAt)
    .Take(10)
    .Select(c => new RecentCardDto
    {
        Id = c.Id,
        Name = c.CardName,
        SetName = db.CardSets
            .Where(s => s.Id == c.CardSetId)
            .Select(s => s.Name)
            .FirstOrDefault(),
        ImageUrl = c.ImagePath,
        AddedOn = c.AddedAt
    })
    .ToListAsync();


            // ----------------------------
            // FINAL DTO
            // ----------------------------
            return Results.Ok(new DashboardDto
            {
                TotalCards = totalCards,
                TotalSets = totalSets,
                CardsInDex = cardsInDex,
                DexCapacity = 1025,
                Sets = sets,
                RecentCards = recentCards
            });
        });
    }
}
 */