using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class PokemonSpeciesEndpoints
{
    public static void MapPokemonSpeciesEndpoints(this WebApplication app)
    {
        app.MapGet("/api/pokemon-species", async (
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var species = await db.PokemonSpecies
            .OrderBy(s => s.Id)
            .ToListAsync();

            return Results.Ok(mapper.Map<List<PokemonSpeciesDto>>(species));
        });

        app.MapGet("/api/pokemon-species/{id:int}", async (
            int id, 
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var species = await db.PokemonSpecies.FindAsync(id);

            if (species is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(mapper.Map<PokemonSpeciesDto>(species));
        });

        app.MapPost("/api/pokemon-species", async (
            PokemonSpeciesCreateDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var entity = mapper.Map<PokemonSpecies>(dto);

            db.PokemonSpecies.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/pokemon-species/{entity.Id}",
                mapper.Map<PokemonSpeciesDto>(entity)
            );
        });

        app.MapPut("/api/pokemon-species/{id:int}", async (
            int id,
            PokemonSpeciesUpdateDto dto,
            AppDbContext db
        ) =>
        {
            var species = await db.PokemonSpecies.FindAsync(id);

            if (species is null)
            {
                return Results.NotFound();                
            }

            species.Name = dto.Name;
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        app.MapDelete("/api/pokemon-species/{id:int}", async (
            int id,
            AppDbContext db
        ) =>
        {
            var species = await db.PokemonSpecies.FindAsync(id);

            if (species is null)
            {
                return Results.NotFound();
            }

            db.PokemonSpecies.Remove(species);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}