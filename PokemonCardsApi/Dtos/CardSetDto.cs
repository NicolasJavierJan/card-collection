public class CardSetDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Code { get; set; }
    public int CardTotal { get; set; }

    public required string LanguageName { get; set; }
}