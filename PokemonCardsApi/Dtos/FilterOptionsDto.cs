public class FilterOptionsDto
{
    public List<CardSetDto> Sets { get; set; } = new();
    public List<CardTypeDto> CardTypes { get; set; } = new();
    public List<LocationDto> Locations { get; set; } = new();
}
