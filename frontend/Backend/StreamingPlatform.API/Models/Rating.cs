namespace StreamingPlatform.API.Models;

public class Rating
{
    public int Id { get; set; }
    public int ProfileId { get; set; }
    public required Profile Profile { get; set; }

    public int ContentId { get; set; }
    public required Content Content { get; set; }

    public int RatingValue { get; set; } // 1-5
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
