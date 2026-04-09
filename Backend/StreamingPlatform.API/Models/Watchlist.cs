namespace StreamingPlatform.API.Models;

public class Watchlist
{
    public int Id { get; set; }
    public int ProfileId { get; set; }
    public required Profile Profile { get; set; }

    public int ContentId { get; set; }
    public required Content Content { get; set; }

    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}
