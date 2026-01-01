public class PokemonCardDto
{
    public Guid Id { get; set; }

    public string CardName { get; set; } = String.Empty;
    public int CardNumber { get; set; }
    public bool? FirstEdition { get; set; }
    public string? ImagePath { get; set; }

    public string? PokemonSpeciesName { get; set; }
    public string? VariantTypeName { get; set; }
    public string? CardTypeName { get; set; }
    public string? CardSetName { get; set; }
    public string? LocationName { get; set; }
    public string? TrainerSubtypeName { get; set; }
    public string? EnergySubtypeName { get; set; }
    public string? PokemonTrainerName { get; set; }

    public string CardLanguageName { get; set; } = string.Empty;
}