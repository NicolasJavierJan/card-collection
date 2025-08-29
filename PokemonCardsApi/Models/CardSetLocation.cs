public class CardSetLocation
{
    public int CardSetId { get; set; }
    public int LocationId { get; set; }

    public CardSet CardSet { get; set; } = null!;
    public Location Location { get; set; } = null!;
}