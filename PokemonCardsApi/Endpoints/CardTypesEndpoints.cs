using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class CardTypesEndpoints
{
    public static void MapCardTypesEndpoints(this WebApplication app)
    {
        app.MapGet("/api/card-types", async (
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var types = await db.CardTypes
            .OrderBy(s => s.Id)
            .ToListAsync();

            return Results.Ok(mapper.Map<List<CardTypeDto>>(types));
        });

        app.MapGet("/api/card-types/{id:int}", async (
            int id, 
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var types = await db.CardTypes.FindAsync(id);

            if (types is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(mapper.Map<CardTypeDto>(types));
        });

        app.MapPost("/api/card-types", async (
            CardTypeCreateDto dto,
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var entity = mapper.Map<CardType>(dto);

            db.CardTypes.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/card-types/{entity.Id}",
                mapper.Map<CardTypeDto>(entity)
            );
        });

        app.MapPut("/api/card-types/{id:int}", async (
            int id,
            CardTypeUpdateDto dto,
            AppDbContext db
        ) =>
        {
            var types = await db.CardTypes.FindAsync(id);

            if (types is null)
            {
                return Results.NotFound();                
            }

            types.Name = dto.Name;
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        app.MapDelete("/api/card-types/{id:int}", async (
            int id,
            AppDbContext db
        ) =>
        {
            var types = await db.CardTypes.FindAsync(id);

            if (types is null)
            {
                return Results.NotFound();
            }

            db.CardTypes.Remove(types);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}