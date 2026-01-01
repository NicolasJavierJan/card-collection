using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class LocationEndpoints
{
    public static void MapLocationEndpoints(this WebApplication app)
    {
        app.MapGet("/api/locations", async (AppDbContext db, IMapper mapper) =>
        {
            var locations = await db.Locations
                .OrderBy(l => l.Name)
                .ToListAsync();

            return Results.Ok(mapper.Map<List<LocationDto>>(locations));
        });

        app.MapGet("/api/locations/{id:int}", async (int id, AppDbContext db, IMapper mapper) =>
        {
            var location = await db.Locations.FindAsync(id);

            if (location is null)
                return Results.NotFound();

            return Results.Ok(mapper.Map<LocationDto>(location));
        });

        app.MapPost("/api/locations", async (LocationCreateDto dto, AppDbContext db, IMapper mapper) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return Results.BadRequest(new { error = "Name is required." });

            if (!Enum.IsDefined(typeof(LocationType), dto.Type))
                return Results.BadRequest(new { error = "Invalid location type." });

            var entity = mapper.Map<Location>(dto);

            db.Locations.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/locations/{entity.Id}",
                mapper.Map<LocationDto>(entity));
        });

        app.MapPut("/api/locations/{id:int}", async (int id, LocationUpdateDto dto, AppDbContext db) =>
        {
            var location = await db.Locations.FindAsync(id);

            if (location is null)
                return Results.NotFound();

            if (string.IsNullOrWhiteSpace(dto.Name))
                return Results.BadRequest(new { error = "Name is required." });

            if (!Enum.IsDefined(typeof(LocationType), dto.Type))
                return Results.BadRequest(new { error = "Invalid location type." });

            location.Name = dto.Name;
            location.Type = dto.Type;

            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapDelete("/api/locations/{id:int}", async (int id, AppDbContext db) =>
        {
            var location = await db.Locations.FindAsync(id);

            if (location is null)
                return Results.NotFound();

            db.Locations.Remove(location);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}

/* using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;

public static class LocationEndpoints
{
    public static void MapLocationEndpoints(this WebApplication app)
    {
        app.MapPost("/api/locations", async (LocationDto dto, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return Results.BadRequest(new { error = "Name is required." });

            if (!Enum.IsDefined(typeof(LocationType), dto.Type))
                return Results.BadRequest(new { error = "Invalid location type." });

            var location = new Location
            {
                Name = dto.Name,
                Type = dto.Type
            };

            db.Locations.Add(location);
            await db.SaveChangesAsync();

            return Results.Ok(new AddLocationDto
            {
                Name = location.Name,
                Type = location.Type
            });
        });
    }
}

public class AddLocationDto
{
    public string Name { get; set; } = string.Empty;
    public LocationType Type { get; set; }
}
 */