public class RecentCardDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }              // card name
    public string SetName { get; set; }           // from card_set
    public string ImageUrl { get; set; }          // if available
    public DateTime? AddedOn { get; set; }         // created_at column
}
