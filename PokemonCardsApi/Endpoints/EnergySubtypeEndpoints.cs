using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class EnergySubtypeEndpoints
{
    public static void MapEnergySubtypeEndpoints(this WebApplication app)
    {
        app.MapGet("/api/energy-subtypes", async (
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var subtypes = await db.EnergySubtypes
            .OrderBy(s => s.Id)
            .ToListAsync();

            return Results.Ok(mapper.Map<List<EnergySubtypeDto>>(subtypes));
        });

        app.MapGet("/api/energy-subtypes/{id:int}", async (
            int id, 
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var subtypes = await db.EnergySubtypes.FindAsync(id);

            if (subtypes is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(mapper.Map<EnergySubtypeDto>(subtypes));
        });

        app.MapPost("/api/energy-subtypes", async (
            EnergySubtypeCreateDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var entity = mapper.Map<EnergySubtype>(dto);

            db.EnergySubtypes.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/energy-subtypes/{entity.Id}",
                mapper.Map<EnergySubtypeDto>(entity)
            );
        });

        app.MapPut("/api/energy-subtypes/{id:int}", async (
            int id,
            EnergySubtypeUpdateDto dto,
            AppDbContext db
        ) =>
        {
            var subtypes = await db.EnergySubtypes.FindAsync(id);

            if (subtypes is null)
            {
                return Results.NotFound();                
            }

            subtypes.Name = dto.Name;
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        app.MapDelete("/api/energy-subtypes/{id:int}", async (
            int id,
            AppDbContext db
        ) =>
        {
            var subtypes = await db.EnergySubtypes.FindAsync(id);

            if (subtypes is null)
            {
                return Results.NotFound();
            }

            db.EnergySubtypes.Remove(subtypes);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}