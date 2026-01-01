using Microsoft.EntityFrameworkCore;

public static class CardSetLocationsEndpoints
{
    public static void MapCardSetLocationsEndpoints(this WebApplication app)
    {
        app.MapGet("/api/card-sets/{cardSetId:int}/locations", async (
            int cardSetId,
            AppDbContext db) =>
        {
            var exists = await db.CardSets.AnyAsync(cs => cs.Id == cardSetId);
            if (!exists)
                return Results.NotFound();

            var locations = await db.CardSetLocations
                .Where(x => x.CardSetId == cardSetId)
                .Include(x => x.Location)
                .Select(x => new
                {
                    x.Location.Id,
                    x.Location.Name,
                    x.Location.Type
                })
                .ToListAsync();

            return Results.Ok(locations);
        });

        app.MapPost("/api/card-sets/{cardSetId:int}/locations", async (
            int cardSetId,
            AddCardSetLocationDto dto,
            AppDbContext db) =>
        {
            if (!await db.CardSets.AnyAsync(cs => cs.Id == cardSetId))
                return Results.NotFound(new { error = "Card set not found." });

            if (!await db.Locations.AnyAsync(l => l.Id == dto.LocationId))
                return Results.BadRequest(new { error = "Location not found." });

            var exists = await db.CardSetLocations.AnyAsync(x =>
                x.CardSetId == cardSetId &&
                x.LocationId == dto.LocationId);

            if (exists)
                return Results.Conflict(new { error = "Location already linked to card set." });

            db.CardSetLocations.Add(new CardSetLocation
            {
                CardSetId = cardSetId,
                LocationId = dto.LocationId
            });

            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/card-sets/{cardSetId}/locations/{dto.LocationId}",
                null);
        });

        app.MapDelete("/api/card-sets/{cardSetId:int}/locations/{locationId:int}", async (
            int cardSetId,
            int locationId,
            AppDbContext db) =>
        {
            var link = await db.CardSetLocations
                .FirstOrDefaultAsync(x =>
                    x.CardSetId == cardSetId &&
                    x.LocationId == locationId);

            if (link is null)
                return Results.NotFound();

            db.CardSetLocations.Remove(link);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}

/* using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

public static class CardSetLocations
{
    public static void MapCardSetLocationsEndpoints(this WebApplication app)
    {
        app.MapGet("/api/card-set-locations", async (
            AppDbContext db,
            [FromServices] IMapper mapper
        ) =>
        {
            var setLocations = await db.CardSetLocations
                .Include(csl => csl.CardSet)
                .OrderBy(csl => csl.CardSet.Name)
                .ToListAsync();

            var dtoCardSetLocations = mapper.Map<List<CardSetLocationDto>>(setLocations);

            return Results.Ok(dtoCardSetLocations);
        });

        app.MapPost("/api/card-set-locations", async (
            AppDbContext db,
            CardSetLocationDto dto
        ) =>
        {
            var location = await db.Locations.FindAsync(dto.LocationId);
            if (location == null) return Results.BadRequest("Invalid location");

            var existing = await db.CardSetLocations
                .Include(csl => csl.Location)
                .Where(csl => csl.CardSetId == dto.CardSetId && csl.Location.Type == location.Type)
                .ToListAsync();

            if (existing.Any())
            {
                db.CardSetLocations.RemoveRange(existing);
            }

            var newCsl = new CardSetLocation
            {
                CardSetId = dto.CardSetId,
                LocationId = dto.LocationId
            };
            db.CardSetLocations.Add(newCsl);

            await db.SaveChangesAsync();
            return Results.Ok(new { success = true });
        });

        app.MapDelete("/api/card-set-locations", async (
            AppDbContext db,
            [FromBody] DeleteCardSetLocationDto dto
        ) =>
        {
            var existing = await db.CardSetLocations
                .Include(csl => csl.Location)
                .Where(csl => csl.CardSetId == dto.CardSetId && csl.Location.Type == dto.Type)
                .ToListAsync();

            if (!existing.Any()) return Results.NotFound();

            db.CardSetLocations.RemoveRange(existing);
            await db.SaveChangesAsync();

            return Results.Ok(new { success = true });
        });
    }
}

public class DeleteCardSetLocationDto
{
    public int CardSetId { get; set; }
    public LocationType Type { get; set; } 
} */