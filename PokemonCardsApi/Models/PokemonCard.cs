using System.ComponentModel.DataAnnotations.Schema;

public class PokemonCard
{
    public required Guid Id { get; set; }
    public required string CardName { get; set; }
    public int? PokemonSpeciesId { get; set; }
    public int? VariantTypeId { get; set; }
    public int? CardTypeId { get; set; }
    public int? CardSetId { get; set; }
    public required int CardNumber { get; set; }
    public bool? FirstEdition { get; set; }
    public int? LocationId { get; set; }
    public int? TrainerSubtypeId { get; set; }
    public int? EnergySubtypeId { get; set; }
    public int? PokemonTrainerId { get; set; }
    public string? ImagePath { get; set; }

    public CardType? CardType { get; set; }
    public CardSet? CardSet { get; set; }
    public Location? Location { get; set; }
    public PokemonSpecies? PokemonSpecies { get; set; }
    public VariantType? VariantType { get; set; }
    public TrainerSubtype? TrainerSubtype { get; set; }
    public EnergySubtype? EnergySubtype { get; set; }
    public PokemonTrainer? PokemonTrainer { get; set; }
}