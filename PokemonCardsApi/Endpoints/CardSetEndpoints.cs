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
                    // No cards owned for this number
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
    }
}