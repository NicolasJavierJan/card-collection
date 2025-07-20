using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

public static class CardSetEndpoints
{
    public static void MapCardSetEndpoints(this WebApplication app)
    {
        app.MapGet("/api/card-sets", async (
            AppDbContext db,
            [FromServices] IMapper mapper
        ) => 
        {
            var cardSets = await db.CardSets
                .Include(c => c.Language)
                .OrderBy(c => c.Id)
                .ToListAsync();
            
            var dtoCardSets = mapper.Map<List<CardSetDto>>(cardSets);

            return Results.Ok(dtoCardSets);
        });
    }
}