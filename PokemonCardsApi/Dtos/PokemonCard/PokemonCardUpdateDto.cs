public class PokemonCardUpdateDto
{
    public string? CardName { get; set; }

    public int? CardNumber { get; set; }
    public bool? FirstEdition { get; set; }

    public int? PokemonSpeciesId { get; set; }
    public int? VariantTypeId { get; set; }
    public int? CardTypeId { get; set; }
    public int? CardSetId { get; set; }

    public int? LocationId { get; set; }
    public int? TrainerSubtypeId { get; set; }
    public int? EnergySubtypeId { get; set; }
    public int? PokemonTrainerId { get; set; }

    public int? CardLanguageId { get; set; }
    public string? ImagePath { get; set; }
}
