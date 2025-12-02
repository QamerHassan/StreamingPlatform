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
public class WatchHistoryController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WatchHistoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/watchhistory
    [HttpGet]
    public async Task<IActionResult> GetWatchHistory([FromQuery] int? profileId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var query = _context.WatchHistories
            .Include(wh => wh.Content)
            .Include(wh => wh.Episode)
            .Include(wh => wh.Profile)
            .Where(wh => wh.Profile.UserId == userId);

        if (profileId.HasValue)
        {
            query = query.Where(wh => wh.ProfileId == profileId.Value);
        }

        var history = await query
            .OrderByDescending(wh => wh.WatchedAt)
            .Select(wh => new
            {
                wh.Id,
                wh.ContentId,
                ContentTitle = wh.Content.Title,
                ContentThumbnail = wh.Content.ThumbnailUrl,
                ContentType = wh.Content.Type,
                EpisodeId = wh.EpisodeId,
                EpisodeTitle = wh.Episode != null ? wh.Episode.Title : null,
                wh.Progress,
                wh.Completed,
                wh.WatchedAt,
                ProfileName = wh.Profile.ProfileName
            })
            .ToListAsync();

        return Ok(history);
    }

    // POST: api/watchhistory
    [HttpPost]
    public async Task<IActionResult> AddWatchHistory([FromBody] AddWatchHistoryRequest request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        // Verify profile belongs to user
        var profile = await _context.Profiles
            .FirstOrDefaultAsync(p => p.Id == request.ProfileId && p.UserId == userId);

        if (profile == null)
            return NotFound(new { message = "Profile not found." });

        // Check if watch history already exists
        var existingHistory = await _context.WatchHistories
            .FirstOrDefaultAsync(wh => wh.ProfileId == request.ProfileId 
                && wh.ContentId == request.ContentId 
                && wh.EpisodeId == request.EpisodeId);

        if (existingHistory != null)
        {
            // Update existing history
            existingHistory.Progress = request.Progress;
            existingHistory.Completed = request.Completed;
            existingHistory.WatchedAt = DateTime.UtcNow;
        }
        else
        {
            // Create new history
            var watchHistory = new WatchHistory
            {
                ProfileId = request.ProfileId,
                ContentId = request.ContentId,
                EpisodeId = request.EpisodeId,
                Progress = request.Progress,
                Completed = request.Completed,
                WatchedAt = DateTime.UtcNow,
                Profile = null!,
                Content = null!
            };

            _context.WatchHistories.Add(watchHistory);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Watch history updated successfully." });
    }

    // DELETE: api/watchhistory/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWatchHistory(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var history = await _context.WatchHistories
            .Include(wh => wh.Profile)
            .FirstOrDefaultAsync(wh => wh.Id == id && wh.Profile.UserId == userId);

        if (history == null)
            return NotFound(new { message = "Watch history not found." });

        _context.WatchHistories.Remove(history);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Watch history deleted successfully." });
    }

    // GET: api/watchhistory/continue-watching
    [HttpGet("continue-watching")]
    public async Task<IActionResult> GetContinueWatching([FromQuery] int? profileId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var query = _context.WatchHistories
            .Include(wh => wh.Content)
            .Include(wh => wh.Episode)
            .Include(wh => wh.Profile)
            .Where(wh => wh.Profile.UserId == userId && !wh.Completed);

        if (profileId.HasValue)
        {
            query = query.Where(wh => wh.ProfileId == profileId.Value);
        }

        var continueWatching = await query
            .OrderByDescending(wh => wh.WatchedAt)
            .Take(20)
            .Select(wh => new
            {
                wh.ContentId,
                ContentTitle = wh.Content.Title,
                ContentThumbnail = wh.Content.ThumbnailUrl,
                ContentType = wh.Content.Type,
                EpisodeId = wh.EpisodeId,
                EpisodeTitle = wh.Episode != null ? wh.Episode.Title : null,
                wh.Progress,
                LastWatched = wh.WatchedAt
            })
            .ToListAsync();

        return Ok(continueWatching);
    }
}

public class AddWatchHistoryRequest
{
    public int ProfileId { get; set; }
    public int ContentId { get; set; }
    public int? EpisodeId { get; set; }
    public int Progress { get; set; }
    public bool Completed { get; set; }
}