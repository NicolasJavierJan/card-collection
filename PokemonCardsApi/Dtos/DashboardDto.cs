public class DashboardDto
{
    public int TotalCards { get; set; }
    public int TotalSets { get; set; }

    public int CardsInDex { get; set; }
    public int DexCapacity { get; set; } // optional

    public List<SetOverviewDto> Sets { get; set; } = new();
    public List<RecentCardDto> RecentCards { get; set; } = new();
}
