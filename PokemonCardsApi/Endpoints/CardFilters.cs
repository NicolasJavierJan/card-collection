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
                .OrderBy(cs => cs.Id)
                .ToListAsync();

            var cardTypes = await db.CardTypes
                .OrderBy(ct => ct.Id)
                .ToListAsync();

            var locations = await db.Locations
                .OrderBy(l => l.Id)
                .ToListAsync();
            
            var pokemonSpecies = await db.PokemonSpecies
                .OrderBy(sp => sp.Id)
                .ToListAsync();
            
            var variantTypes = await db.VariantTypes
                .OrderBy(vt => vt.Id)
                .ToListAsync();

            var cardLanguages = await db.CardLanguages
                .OrderBy(l => l.Id)
                .ToListAsync();

            var trainerSubtypes = await db.TrainerSubtypes
                .OrderBy(ts => ts.Id)
                .ToListAsync();
            
            var energySubtypes = await db.EnergySubtypes
                .OrderBy(es => es.Id)
                .ToListAsync();

            var pokemonTrainers = await db.PokemonTrainers
                .OrderBy(pt => pt.Id)
                .ToListAsync();

            var result = new FilterOptionsDto
            {
                Sets = mapper.Map<List<CardSetDto>>(sets),
                CardTypes = mapper.Map<List<CardTypeDto>>(cardTypes),
                Locations = mapper.Map<List<LocationDto>>(locations),
                PokemonSpecies = mapper.Map<List<PokemonSpeciesDto>>(pokemonSpecies),
                VariantTypes = mapper.Map<List<VariantTypeDto>>(variantTypes),
                CardLanguages = mapper.Map<List<CardLanguageDto>>(cardLanguages),
                TrainerSubtypes = mapper.Map<List<TrainerSubtypeDto>>(trainerSubtypes),
                EnergySubtypes = mapper.Map<List<EnergySubtypeDto>>(energySubtypes),
                PokemonTrainers = mapper.Map<List<PokemonTrainerDto>>(pokemonTrainers)
            };

            return Results.Ok(result);
        });

    }
}