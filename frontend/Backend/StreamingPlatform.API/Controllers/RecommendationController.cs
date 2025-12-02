using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamingPlatform.API.Data;
using System.Security.Claims;

namespace StreamingPlatform.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RecommendationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RecommendationController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/recommendation
    [HttpGet]
    public async Task<IActionResult> GetRecommendations([FromQuery] int? profileId, [FromQuery] int limit = 20)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        // Get user's watch history to find preferred genres
        var watchHistoryQuery = _context.WatchHistories
            .Include(wh => wh.Content)
            .Include(wh => wh.Profile)
            .Where(wh => wh.Profile.UserId == userId);

        if (profileId.HasValue)
        {
            watchHistoryQuery = watchHistoryQuery.Where(wh => wh.ProfileId == profileId.Value);
        }

        var watchedContent = await watchHistoryQuery
            .Select(wh => new { wh.Content.Genre, wh.ContentId })
            .ToListAsync();

        // Get most watched genres
        var preferredGenres = watchedContent
            .Where(w => !string.IsNullOrEmpty(w.Genre))
            .GroupBy(w => w.Genre)
            .OrderByDescending(g => g.Count())
            .Take(3)
            .Select(g => g.Key)
            .ToList();

        // Get content recommendations based on preferred genres
        var watchedContentIds = watchedContent.Select(w => w.ContentId).Distinct().ToList();
        
        var recommendations = await _context.Contents
            .Where(c => c.IsActive && !watchedContentIds.Contains(c.Id))
            .Where(c => preferredGenres.Any() && preferredGenres.Contains(c.Genre))
            .OrderByDescending(c => c.Rating)
            .ThenByDescending(c => c.ReleaseYear)
            .Take(limit)
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
                c.TrailerUrl
            })
            .ToListAsync();

        // If not enough recommendations, add popular content
        if (recommendations.Count < limit)
        {
            var popularContent = await _context.Contents
                .Where(c => c.IsActive && !watchedContentIds.Contains(c.Id) && !recommendations.Select(r => r.Id).Contains(c.Id))
                .OrderByDescending(c => c.Rating)
                .ThenByDescending(c => c.ReleaseYear)
                .Take(limit - recommendations.Count)
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
                    c.TrailerUrl
                })
                .ToListAsync();

            recommendations.AddRange(popularContent);
        }

        return Ok(new
        {
            recommendations,
            preferredGenres,
            totalRecommendations = recommendations.Count
        });
    }

    // GET: api/recommendation/trending
    [HttpGet("trending")]
    public async Task<IActionResult> GetTrending([FromQuery] int limit = 20)
    {
        var trending = await _context.WatchHistories
            .Include(wh => wh.Content)
            .Where(wh => wh.WatchedAt >= DateTime.UtcNow.AddDays(-30))
            .GroupBy(wh => wh.ContentId)
            .OrderByDescending(g => g.Count())
            .Take(limit)
            .Select(g => new
            {
                ContentId = g.Key,
                WatchCount = g.Count(),
                Content = g.First().Content
            })
            .Select(x => new
            {
                x.Content.Id,
                x.Content.Title,
                x.Content.Description,
                x.Content.Type,
                x.Content.Genre,
                x.Content.ReleaseYear,
                x.Content.Rating,
                x.Content.Duration,
                x.Content.ThumbnailUrl,
                x.Content.TrailerUrl,
                x.WatchCount
            })
            .ToListAsync();

        return Ok(trending);
    }

    // GET: api/recommendation/similar/{contentId}
    [HttpGet("similar/{contentId}")]
    public async Task<IActionResult> GetSimilarContent(int contentId, [FromQuery] int limit = 10)
    {
        var content = await _context.Contents.FindAsync(contentId);
        
        if (content == null)
            return NotFound(new { message = "Content not found." });

        var similarContent = await _context.Contents
            .Where(c => c.IsActive 
                && c.Id != contentId 
                && (c.Genre == content.Genre || c.Type == content.Type))
            .OrderByDescending(c => c.Rating)
            .ThenByDescending(c => c.ReleaseYear)
            .Take(limit)
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
                c.TrailerUrl
            })
            .ToListAsync();

        return Ok(similarContent);
    }
}

