namespace StreamingPlatform.API.Models;

public class Content
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Type { get; set; } = null!; // "Movie" or "Series"
    public string? Genre { get; set; }
    public int? ReleaseYear { get; set; }
    public decimal? Rating { get; set; }
    public int? Duration { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? TrailerUrl { get; set; }
    public string? VideoUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public required List<Season> Seasons { get; set; }
    public required List<WatchHistory> WatchHistories { get; set; }
    public required List<Watchlist> Watchlists { get; set; }
    public required List<Rating> Ratings { get; set; }
}
