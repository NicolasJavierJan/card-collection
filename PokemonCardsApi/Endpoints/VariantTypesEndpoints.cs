using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class VariantTypesEndpoints
{
    public static void MapVariantTypesEndpoints(this WebApplication app)
    {
        app.MapGet("/api/variant-types", async (
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var variants = await db.VariantTypes
            .OrderBy(v => v.Id)
            .ToListAsync();

            return Results.Ok(mapper.Map<List<VariantTypeDto>>(variants));
        });

        app.MapGet("/api/variant-types/{id:int}", async (
            int id, 
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var variants = await db.VariantTypes.FindAsync(id);

            if (variants is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(mapper.Map<VariantTypeDto>(variants));
        });

        app.MapPost("/api/variant-types", async (
            VariantTypeCreateDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var entity = mapper.Map<VariantType>(dto);

            db.VariantTypes.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/variant-types/{entity.Id}",
                mapper.Map<VariantTypeDto>(entity)
            );
        });

        app.MapPut("/api/variant-types/{id:int}", async (
            int id,
            VariantTypeUpdateDto dto,
            AppDbContext db
        ) =>
        {
            var variants = await db.VariantTypes.FindAsync(id);

            if (variants is null)
            {
                return Results.NotFound();                
            }

            variants.Name = dto.Name;
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        app.MapDelete("/api/variant-types/{id:int}", async (
            int id,
            AppDbContext db
        ) =>
        {
            var variants = await db.VariantTypes.FindAsync(id);

            if (variants is null)
            {
                return Results.NotFound();
            }

            db.VariantTypes.Remove(variants);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}