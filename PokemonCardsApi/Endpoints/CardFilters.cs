using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class CardFilters
{
    public static void MapCardFilters(this WebApplication app)
    {
        app.MapGet("/api/cards/filters", async (
            AppDbContext db,
            IMapper mapper
        ) =>
        {
            var sets = await db.CardSets
                .Include(cs => cs.Language)
                .OrderBy(cs => cs.Id)
                .ToListAsync();

            var cardTypes = await db.CardTypes
                .OrderBy(ct => ct.Id)
                .ToListAsync();

            var locations = await db.Locations
                .OrderBy(l => l.Id)
                .ToListAsync();

            var result = new FilterOptionsDto
            {
                Sets = mapper.Map<List<CardSetDto>>(sets),
                CardTypes = mapper.Map<List<CardTypeDto>>(cardTypes),
                Locations = mapper.Map<List<LocationDto>>(locations)
            };

            return Results.Ok(result);
        });

    }
}