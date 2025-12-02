using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamingPlatform.API.Data;
using StreamingPlatform.API.Models;

namespace StreamingPlatform.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ContentController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/content
    [HttpGet]
    public async Task<IActionResult> GetAllContent([FromQuery] string? type = null, [FromQuery] string? genre = null)
    {
        var query = _context.Contents
            .Include(c => c.Seasons)
            .ThenInclude(s => s.Episodes)
            .Where(c => c.IsActive);

        if (!string.IsNullOrEmpty(type))
            query = query.Where(c => c.Type == type);

        if (!string.IsNullOrEmpty(genre))
            query = query.Where(c => c.Genre == genre);

        var content = await query
            .Select(c => new
            {
                c.Id,
                c.Title,
                c.Description,
                c.Type,
                c.Genre,
                c.ReleaseYear,
                c.Rating,
                c.Duration,
                c.ThumbnailUrl,
                c.TrailerUrl,
                SeasonsCount = c.Seasons.Count,
                EpisodesCount = c.Seasons.Sum(s => s.Episodes.Count)
            })
            .ToListAsync();

        return Ok(content);
    }

    // GET: api/content/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetContentById(int id)
    {
        var content = await _context.Contents
            .Include(c => c.Seasons)
            .ThenInclude(s => s.Episodes)
            .Include(c => c.Ratings)
            .FirstOrDefaultAsync(c => c.Id == id && c.IsActive);

        if (content == null)
            return NotFound(new { message = "Content not found." });

        var result = new
        {
            content.Id,
            content.Title,
            content.Description,
            content.Type,
            content.Genre,
            content.ReleaseYear,
            content.Rating,
            content.Duration,
            content.ThumbnailUrl,
            content.TrailerUrl,
            content.VideoUrl,
            Seasons = content.Seasons.Select(s => new
            {
                s.Id,
                s.SeasonNumber,
                s.Title,
                Episodes = s.Episodes.Select(e => new
                {
                    e.Id,
                    e.EpisodeNumber,
                    e.Title,
                    e.Description,
                    e.Duration,
                    e.ThumbnailUrl
                })
            }),
            AverageRating = content.Ratings.Any() ? content.Ratings.Average(r => r.RatingValue) : 0,
            TotalRatings = content.Ratings.Count
        };

        return Ok(result);
    }

    // POST: api/content (Admin only)
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateContent([FromBody] CreateContentRequest request)
    {
        var content = new Content
        {
            Title = request.Title,
            Description = request.Description,
            Type = request.Type,
            Genre = request.Genre,
            ReleaseYear = request.ReleaseYear,
            Duration = request.Duration,
            ThumbnailUrl = request.ThumbnailUrl,
            TrailerUrl = request.TrailerUrl,
            VideoUrl = request.VideoUrl,
            Seasons = new List<Season>(),
            WatchHistories = new List<WatchHistory>(),
            Watchlists = new List<Watchlist>(),
            Ratings = new List<Rating>()
        };

        _context.Contents.Add(content);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetContentById), new { id = content.Id }, content);
    }

    // PUT: api/content/{id} (Admin only)
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateContent(int id, [FromBody] UpdateContentRequest request)
    {
        var content = await _context.Contents.FindAsync(id);
        if (content == null)
            return NotFound(new { message = "Content not found." });

        content.Title = request.Title ?? content.Title;
        content.Description = request.Description ?? content.Description;
        content.Genre = request.Genre ?? content.Genre;
        content.ThumbnailUrl = request.ThumbnailUrl ?? content.ThumbnailUrl;
        content.TrailerUrl = request.TrailerUrl ?? content.TrailerUrl;
        content.VideoUrl = request.VideoUrl ?? content.VideoUrl;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Content updated successfully.", content });
    }

    // DELETE: api/content/{id} (Admin only)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteContent(int id)
    {
        var content = await _context.Contents.FindAsync(id);
        if (content == null)
            return NotFound(new { message = "Content not found." });

        content.IsActive = false; // Soft delete
        await _context.SaveChangesAsync();

        return Ok(new { message = "Content deleted successfully." });
    }
}

// DTOs
public class CreateContentRequest
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Type { get; set; } = null!;
    public string? Genre { get; set; }
    public int? ReleaseYear { get; set; }
    public int? Duration { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? TrailerUrl { get; set; }
    public string? VideoUrl { get; set; }
}

public class UpdateContentRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Genre { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? TrailerUrl { get; set; }
    public string? VideoUrl { get; set; }
}