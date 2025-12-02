namespace StreamingPlatform.API.Models;

public class Profile
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required User User { get; set; }

    public string ProfileName { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public bool IsKidsProfile { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public required List<WatchHistory> WatchHistories { get; set; }
    public required List<Watchlist> Watchlists { get; set; }
    public required List<Rating> Ratings { get; set; }
}
