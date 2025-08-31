using Microsoft.AspNetCore.Builder;
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
