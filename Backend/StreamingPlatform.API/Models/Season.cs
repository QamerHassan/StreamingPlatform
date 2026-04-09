namespace StreamingPlatform.API.Models;

public class Season
{
    public int Id { get; set; }
    public int ContentId { get; set; }
    public required Content Content { get; set; }

    public int SeasonNumber { get; set; }
    public string? Title { get; set; }
    public int? ReleaseYear { get; set; }

    public required List<Episode> Episodes { get; set; }
}
