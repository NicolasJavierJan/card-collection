public class CardSetLocation
{
    public int Id { get; set; }
    public int CardSetId { get; set; }
    public int LocationId { get; set; }

    public CardSet CardSet { get; set; } = null!;
    public Location Location { get; set; } = null!;
}