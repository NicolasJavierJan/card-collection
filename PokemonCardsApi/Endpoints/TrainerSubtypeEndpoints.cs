using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class TrainerSubtypeEndpoints
{
    public static void MapTrainerSubtypeEndpoints(this WebApplication app)
    {
        app.MapGet("/api/trainer-subtypes", async (
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var subtypes = await db.TrainerSubtypes
            .OrderBy(s => s.Id)
            .ToListAsync();

            return Results.Ok(mapper.Map<List<TrainerSubtypeDto>>(subtypes));
        });

        app.MapGet("/api/trainer-subtypes/{id:int}", async (
            int id, 
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var subtypes = await db.TrainerSubtypes.FindAsync(id);

            if (subtypes is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(mapper.Map<TrainerSubtypeDto>(subtypes));
        });

        app.MapPost("/api/trainer-subtypes", async (
            TrainerSubtypeCreateDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var entity = mapper.Map<TrainerSubtype>(dto);

            db.TrainerSubtypes.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/trainer-subtypes/{entity.Id}",
                mapper.Map<TrainerSubtypeDto>(entity)
            );
        });

        app.MapPut("/api/trainer-subtypes/{id:int}", async (
            int id,
            TrainerSubtypeUpdateDto dto,
            AppDbContext db
        ) =>
        {
            var subtypes = await db.TrainerSubtypes.FindAsync(id);

            if (subtypes is null)
            {
                return Results.NotFound();                
            }

            subtypes.Name = dto.Name;
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        app.MapDelete("/api/trainer-subtypes/{id:int}", async (
            int id,
            AppDbContext db
        ) =>
        {
            var subtypes = await db.TrainerSubtypes.FindAsync(id);

            if (subtypes is null)
            {
                return Results.NotFound();
            }

            db.TrainerSubtypes.Remove(subtypes);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}