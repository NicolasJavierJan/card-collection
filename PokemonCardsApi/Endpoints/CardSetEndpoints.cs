using AutoMapper;
using Microsoft.EntityFrameworkCore;

public static class CardSetEndpoints
{
    public static void MapCardSetEndpoints(this WebApplication app)
    {
        app.MapGet("/api/card-sets", async (
            AppDbContext db,
            IMapper mapper) =>
        {
            var sets = await db.CardSets
                .OrderBy(s => s.Name)
                .ToListAsync();

            return Results.Ok(mapper.Map<List<CardSetDto>>(sets));
        });

        app.MapGet("/api/card-sets/{id:int}", async (
            int id,
            AppDbContext db,
            IMapper mapper) =>
        {
            var set = await db.CardSets.FindAsync(id);

            if (set is null)
                return Results.NotFound();

            return Results.Ok(mapper.Map<CardSetDto>(set));
        });

        app.MapPost("/api/card-sets", async (
            CardSetCreateDto dto,
            AppDbContext db,
            IMapper mapper) =>
        {
            if (dto.CardTotal <= 0)
                return Results.BadRequest("CardTotal must be greater than 0.");

            var entity = mapper.Map<CardSet>(dto);

            db.CardSets.Add(entity);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/card-sets/{entity.Id}",
                mapper.Map<CardSetDto>(entity));
        });

        app.MapPut("/api/card-sets/{id:int}", async (
            int id,
            CardSetUpdateDto dto,
            AppDbContext db) =>
        {
            if (dto.CardTotal <= 0)
                return Results.BadRequest("CardTotal must be greater than 0.");

            var set = await db.CardSets.FindAsync(id);

            if (set is null)
                return Results.NotFound();

            set.Name = dto.Name;
            set.Code = dto.Code;
            set.CardTotal = dto.CardTotal;

            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapDelete("/api/card-sets/{id:int}", async (
            int id,
            AppDbContext db) =>
        {
            var set = await db.CardSets.FindAsync(id);

            if (set is null)
                return Results.NotFound();

            db.CardSets.Remove(set);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}

/* using Microsoft.EntityFrameworkCore;
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
                .OrderBy(c => c.Name)
                .ToListAsync();

            var dtoCardSets = mapper.Map<List<CardSetDto>>(cardSets);

            return Results.Ok(dtoCardSets);
        });

        app.MapGet("/api/card-sets/{setId:int}", async (
            int setId,
            AppDbContext db
        ) =>
        {
            const String CardBackPlaceholderPath = "/back/card-back.png";

            var totalCards = await db.CardSets
                .Where(s => s.Id == setId)
                .Select(s => s.CardTotal)
                .FirstAsync();

            var cardsInSet = await db.PokemonCards
                .Where(c => c.CardSetId == setId)
                .Include(c => c.CardType)
                .Include(c => c.VariantType)
                .Include(c => c.Location)
                .Include(c => c.TrainerSubtype)
                .Include(c => c.EnergySubtype)
                .Include(c => c.CardLanguage)
                .OrderBy(c => c.CardNumber)
                .ToListAsync();

            var checklist = new List<object>();

            for (int num = 1; num <= totalCards; num++)
            {
                var matchingCards = cardsInSet
                    .Where(c => c.CardNumber == num)
                    .ToList();

                if (!matchingCards.Any())
                {
                    checklist.Add(new
                    {
                        CardNumber = num,
                        CardNames = new List<string>(),
                        Variant = (string?)null,
                        CardType = (string?)null,
                        TrainerSubtype = (string?)null,
                        EnergySubtype = (string?)null,
                        Languages = new List<string>(),
                        Locations = new List<string>(),
                        Images = new List<string> { CardBackPlaceholderPath }
                    });
                }
                else
                {
                    var firstCard = matchingCards.First(); // for single-value fields
                    checklist.Add(new
                    {
                        CardNumber = num,
                        CardNames = matchingCards
                            .Select(c => c.CardName)
                            .Where(n => !string.IsNullOrEmpty(n))
                            .Distinct()
                            .ToList(),
                        Variant = (string?)firstCard.VariantType?.Name,
                        CardType = (string?)firstCard.CardType?.Name,
                        TrainerSubtype = (string?)firstCard.TrainerSubtype?.Name,
                        EnergySubtype = (string?)firstCard.EnergySubtype?.Name,
                        Languages = matchingCards
                            .Select(c => c.CardLanguage?.Name)
                            .Where(l => l != null)
                            .Distinct()
                            .ToList(),
                        Locations = matchingCards
                            .Select(c => c.Location?.Name)
                            .Where(loc => loc != null)
                            .Distinct()
                            .ToList(),
                        Images = new List<string> { firstCard.ImagePath! }
                    });
                }
            }


            return Results.Ok(new
            {
                SetId = setId,
                TotalCards = totalCards,
                Checklist = checklist
            });
        });

        app.MapPost("/api/card-sets", async (
            [FromBody] CreateCardSetRequest request,
            AppDbContext db
        ) =>
        {
            var newSet = new CardSet
            {
                Name = request.Name,
                Code = request.Code,
                CardTotal = request.TotalCards
            };

            db.CardSets.Add(newSet);
            await db.SaveChangesAsync();

            var locationsToLink = new List<CardSetLocation>();

            if (request.BinderLocationId.HasValue)
            {
                locationsToLink.Add(new CardSetLocation
                {
                    CardSetId = newSet.Id,
                    LocationId = request.BinderLocationId.Value
                });
            }

            if (request.BoxLocationId.HasValue)
            {
                locationsToLink.Add(new CardSetLocation
                {
                    CardSetId = newSet.Id,
                    LocationId = request.BoxLocationId.Value
                });
            }

            if (locationsToLink.Any())
            {
                db.CardSetLocations.AddRange(locationsToLink);
                await db.SaveChangesAsync();
            }

            return Results.Created($"/api/card-sets/{newSet.Id}", newSet);
        });
    }
    
    public record CreateCardSetRequest
    {
        public string Name { get; init; } = string.Empty;
        public string Code { get; init; } = string.Empty;
        public int TotalCards { get; init; }
        public int? BinderLocationId { get; init; }
        public int? BoxLocationId { get; init; }
    }
} */

