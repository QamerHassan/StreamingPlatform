using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamingPlatform.API.Data;
using StreamingPlatform.API.Models;
using System.Security.Claims;

namespace StreamingPlatform.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WatchlistController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WatchlistController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/watchlist
    [HttpGet]
    public async Task<IActionResult> GetWatchlist([FromQuery] int? profileId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var query = _context.Watchlists
            .Include(w => w.Content)
            .Include(w => w.Profile)
            .Where(w => w.Profile.UserId == userId);

        if (profileId.HasValue)
        {
            query = query.Where(w => w.ProfileId == profileId.Value);
        }

        var watchlist = await query
            .OrderByDescending(w => w.AddedAt)
            .Select(w => new
            {
                w.Id,
                w.ContentId,
                ContentTitle = w.Content.Title,
                ContentDescription = w.Content.Description,
                ContentThumbnail = w.Content.ThumbnailUrl,
                ContentType = w.Content.Type,
                ContentGenre = w.Content.Genre,
                ContentRating = w.Content.Rating,
                ContentReleaseYear = w.Content.ReleaseYear,
                w.AddedAt,
                ProfileName = w.Profile.ProfileName
            })
            .ToListAsync();

        return Ok(watchlist);
    }

    // POST: api/watchlist
    [HttpPost]
    public async Task<IActionResult> AddToWatchlist([FromBody] AddToWatchlistRequest request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        // Verify profile belongs to user
        var profile = await _context.Profiles
            .FirstOrDefaultAsync(p => p.Id == request.ProfileId && p.UserId == userId);

        if (profile == null)
            return NotFound(new { message = "Profile not found." });

        // Check if already in watchlist
        var exists = await _context.Watchlists
            .AnyAsync(w => w.ProfileId == request.ProfileId && w.ContentId == request.ContentId);

        if (exists)
            return BadRequest(new { message = "Content already in watchlist." });

        var watchlistItem = new Watchlist
        {
            ProfileId = request.ProfileId,
            ContentId = request.ContentId,
            AddedAt = DateTime.UtcNow,
            Profile = null!,
            Content = null!
        };

        _context.Watchlists.Add(watchlistItem);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Added to watchlist successfully.", id = watchlistItem.Id });
    }

    // DELETE: api/watchlist/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveFromWatchlist(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var watchlistItem = await _context.Watchlists
            .Include(w => w.Profile)
            .FirstOrDefaultAsync(w => w.Id == id && w.Profile.UserId == userId);

        if (watchlistItem == null)
            return NotFound(new { message = "Watchlist item not found." });

        _context.Watchlists.Remove(watchlistItem);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Removed from watchlist successfully." });
    }

    // DELETE: api/watchlist/content/{contentId}
    [HttpDelete("content/{contentId}")]
    public async Task<IActionResult> RemoveContentFromWatchlist(int contentId, [FromQuery] int? profileId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var query = _context.Watchlists
            .Include(w => w.Profile)
            .Where(w => w.ContentId == contentId && w.Profile.UserId == userId);

        if (profileId.HasValue)
        {
            query = query.Where(w => w.ProfileId == profileId.Value);
        }

        var items = await query.ToListAsync();

        if (!items.Any())
            return NotFound(new { message = "Content not found in watchlist." });

        _context.Watchlists.RemoveRange(items);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Removed from watchlist successfully." });
    }

    // GET: api/watchlist/check/{contentId}
    [HttpGet("check/{contentId}")]
    public async Task<IActionResult> CheckInWatchlist(int contentId, [FromQuery] int? profileId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var query = _context.Watchlists
            .Include(w => w.Profile)
            .Where(w => w.ContentId == contentId && w.Profile.UserId == userId);

        if (profileId.HasValue)
        {
            query = query.Where(w => w.ProfileId == profileId.Value);
        }

        var exists = await query.AnyAsync();

        return Ok(new { inWatchlist = exists });
    }
}

public class AddToWatchlistRequest
{
    public int ProfileId { get; set; }
    public int ContentId { get; set; }
}