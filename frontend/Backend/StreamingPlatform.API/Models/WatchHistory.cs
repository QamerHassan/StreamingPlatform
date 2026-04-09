namespace StreamingPlatform.API.Models;

public class WatchHistory
{
    public int Id { get; set; }
    public int ProfileId { get; set; }
    public required Profile Profile { get; set; }

    public int ContentId { get; set; }
    public required Content Content { get; set; }

    public int? EpisodeId { get; set; }
    public Episode? Episode { get; set; }

    public DateTime WatchedAt { get; set; } = DateTime.UtcNow;
    public int Progress { get; set; } = 0;
    public bool Completed { get; set; } = false;
}
