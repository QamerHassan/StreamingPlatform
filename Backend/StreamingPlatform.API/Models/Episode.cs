namespace StreamingPlatform.API.Models;

public class Episode
{
    public int Id { get; set; }
    public int SeasonId { get; set; }
    public required Season Season { get; set; }

    public int EpisodeNumber { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int? Duration { get; set; }
    public string? VideoUrl { get; set; }
    public string? ThumbnailUrl { get; set; }

    public required List<WatchHistory> WatchHistories { get; set; }
}
