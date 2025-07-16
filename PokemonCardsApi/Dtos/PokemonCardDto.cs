public class PokemonCardDto
{
    public Guid Id { get; set; }
    public required string CardName { get; set; }
    public int CardNumber { get; set; }
    public bool? FirstEdition { get; set; }
    public string? ImagePath { get; set; }

    public string? CardTypeName { get; set; }
    public string? SetName { get; set; }
    public string? LocationName { get; set; }
}