public class FilterOptionsDto
{
    public List<CardSetDto> Sets { get; set; } = new();
    public List<CardTypeDto> CardTypes { get; set; } = new();
    public List<LocationDto> Locations { get; set; } = new();
    public List<PokemonSpeciesDto> PokemonSpecies { get; set; } = new();
    public List<VariantTypeDto> VariantTypes { get; set; } = new();
    public List<CardLanguageDto> CardLanguages { get; set; } = new();
    public List<TrainerSubtypeDto> TrainerSubtypes { get; set; } = new();
    public List<EnergySubtypeDto> EnergySubtypes { get; set; } = new();
    public List<PokemonTrainerDto> PokemonTrainers { get; set; } = new();
}
