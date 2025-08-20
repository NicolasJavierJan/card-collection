public class LocationDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public LocationType Type { get; set; }
}

public enum LocationType
{
    CardDex,
    Binder,
    Box
}