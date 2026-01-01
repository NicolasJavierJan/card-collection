using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public static class CardLanguageEndpoints
{
    public static void MapCardLanguageEndpoints(this WebApplication app)
    {
        app.MapGet("/api/card-languages", async (
            AppDbContext db,
            IMapper mapper) =>
        {
            var languages = await db.CardLanguages
                .OrderBy(l => l.Name)
                .ToListAsync();

            return Results.Ok(mapper.Map<List<CardLanguageDto>>(languages));
        });

        app.MapGet("/api/card-languages/{id:int}", async (
            int id,
            AppDbContext db,
            IMapper mapper) =>
        {
            var language = await db.CardLanguages.FindAsync(id);

            if (language is null)
                return Results.NotFound();

            return Results.Ok(mapper.Map<CardLanguageDto>(language));
        });

        app.MapPost("/api/card-languages", async (
            CardLanguageCreateDto dto,
            AppDbContext db,
            IMapper mapper) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Code))
                return Results.BadRequest(new { error = "Code is required." });

            if (string.IsNullOrWhiteSpace(dto.Name))
                return Results.BadRequest(new { error = "Name is required." });

            var entity = mapper.Map<CardLanguage>(dto);

            db.CardLanguages.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/card-languages/{entity.Id}",
                mapper.Map<CardLanguageDto>(entity));
        });

        app.MapPut("/api/card-languages/{id:int}", async (
            int id,
            CardLanguageUpdateDto dto,
            AppDbContext db) =>
        {
            var language = await db.CardLanguages.FindAsync(id);

            if (language is null)
                return Results.NotFound();

            if (string.IsNullOrWhiteSpace(dto.Code))
                return Results.BadRequest(new { error = "Code is required." });

            if (string.IsNullOrWhiteSpace(dto.Name))
                return Results.BadRequest(new { error = "Name is required." });

            language.Code = dto.Code;
            language.Name = dto.Name;

            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapDelete("/api/card-languages/{id:int}", async (
            int id,
            AppDbContext db) =>
        {
            var language = await db.CardLanguages.FindAsync(id);

            if (language is null)
                return Results.NotFound();

            db.CardLanguages.Remove(language);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}
