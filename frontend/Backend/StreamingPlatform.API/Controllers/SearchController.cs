using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamingPlatform.API.Data;

namespace StreamingPlatform.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SearchController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/search
    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] string? query, [FromQuery] string? type, 
        [FromQuery] string? genre, [FromQuery] int? year, [FromQuery] decimal? minRating,
        [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var searchQuery = _context.Contents
            .Where(c => c.IsActive)
            .AsQueryable();

        // Text search
        if (!string.IsNullOrWhiteSpace(query))
        {
            searchQuery = searchQuery.Where(c => 
                c.Title.Contains(query) || 
                (c.Description != null && c.Description.Contains(query)));
        }

        // Type filter
        if (!string.IsNullOrWhiteSpace(type))
        {
            searchQuery = searchQuery.Where(c => c.Type == type);
        }

        // Genre filter
        if (!string.IsNullOrWhiteSpace(genre))
        {
            searchQuery = searchQuery.Where(c => c.Genre != null && c.Genre.Contains(genre));
        }

        // Year filter
        if (year.HasValue)
        {
            searchQuery = searchQuery.Where(c => c.ReleaseYear == year.Value);
        }

        // Rating filter
        if (minRating.HasValue)
        {
            searchQuery = searchQuery.Where(c => c.Rating >= minRating.Value);
        }

        var totalCount = await searchQuery.CountAsync();

        var results = await searchQuery
            .OrderByDescending(c => c.Rating)
            .ThenByDescending(c => c.ReleaseYear)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
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

        return Ok(new
        {
            results,
            totalCount,
            page,
            pageSize,
            totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
        });
    }

    // GET: api/search/genres
    [HttpGet("genres")]
    public async Task<IActionResult> GetGenres()
    {
        var genres = await _context.Contents
            .Where(c => c.IsActive && !string.IsNullOrEmpty(c.Genre))
            .Select(c => c.Genre!)
            .Distinct()
            .OrderBy(g => g)
            .ToListAsync();

        return Ok(genres);
    }

    // GET: api/search/years
    [HttpGet("years")]
    public async Task<IActionResult> GetYears()
    {
        var years = await _context.Contents
            .Where(c => c.IsActive && c.ReleaseYear.HasValue)
            .Select(c => c.ReleaseYear!.Value)
            .Distinct()
            .OrderByDescending(y => y)
            .ToListAsync();

        return Ok(years);
    }
}

