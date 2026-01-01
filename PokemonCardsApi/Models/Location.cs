public class Location
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public LocationType Type { get; set; }

    public ICollection<CardSetLocation> CardSetLocations { get; set; } = new List<CardSetLocation>();
}
