using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class PokemonTrainerEndpoints
{
    public static void MapPokemonTrainerEndpoints(this WebApplication app)
    {
        app.MapGet("/api/pokemon-trainers", async (
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var trainers = await db.PokemonTrainers
            .OrderBy(t => t.Id)
            .ToListAsync();

            return Results.Ok(mapper.Map<List<PokemonTrainerDto>>(trainers));
        });

        app.MapGet("/api/pokemon-trainers/{id:int}", async (
            int id, 
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var trainers = await db.PokemonTrainers.FindAsync(id);

            if (trainers is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(mapper.Map<PokemonTrainerDto>(trainers));
        });

        app.MapPost("/api/pokemon-trainers", async (
            PokemonTrainerCreateDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var entity = mapper.Map<PokemonTrainer>(dto);

            db.PokemonTrainers.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/pokemon-trainers/{entity.Id}",
                mapper.Map<PokemonTrainerDto>(entity)
            );
        });

        app.MapPut("/api/pokemon-trainers/{id:int}", async (
            int id,
            PokemonTrainerUpdateDto dto,
            AppDbContext db
        ) =>
        {
            var trainers = await db.PokemonTrainers.FindAsync(id);

            if (trainers is null)
            {
                return Results.NotFound();                
            }

            trainers.Name = dto.Name;
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        app.MapDelete("/api/pokemon-trainers/{id:int}", async (
            int id,
            AppDbContext db
        ) =>
        {
            var trainers = await db.PokemonTrainers.FindAsync(id);

            if (trainers is null)
            {
                return Results.NotFound();
            }

            db.PokemonTrainers.Remove(trainers);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}