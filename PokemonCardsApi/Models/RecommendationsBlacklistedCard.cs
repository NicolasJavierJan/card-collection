public class RecommendationsBlacklistedCard
{
    public Guid CardId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}