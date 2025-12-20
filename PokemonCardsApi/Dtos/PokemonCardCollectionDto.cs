public class PokemonCardCollectionDto
{
    public Guid Id { get; set; }

    public string CardName { get; set; } = null!;
    public int CardNumber { get; set; }

    public string SetName { get; set; } = null!;
    public string LanguageName { get; set; } = null!;

    public string? LocationName { get; set; }
    public string? ImagePath { get; set; }

    public bool FirstEdition { get; set; }
}

// USED IN COLLECTION PAGE.