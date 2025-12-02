using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamingPlatform.API.Data;
using StreamingPlatform.API.Models;
using System.Security.Claims;

namespace StreamingPlatform.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/admin/dashboard
    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var totalUsers = await _context.Users.CountAsync();
        var activeUsers = await _context.Users.CountAsync(u => u.IsActive);
        var totalContent = await _context.Contents.CountAsync();
        var activeContent = await _context.Contents.CountAsync(c => c.IsActive);
        var totalSubscriptions = await _context.Subscriptions.CountAsync(s => s.Status == "Active");
        var totalRevenue = await _context.Payments
            .Where(p => p.Status == "Completed")
            .SumAsync(p => (double?)p.Amount) ?? 0;

        var recentUsers = await _context.Users
            .OrderByDescending(u => u.CreatedAt)
            .Take(10)
            .Select(u => new
            {
                u.Id,
                u.Email,
                u.FirstName,
                u.LastName,
                u.Role,
                u.CreatedAt,
                u.IsActive
            })
            .ToListAsync();

        var topContent = await _context.WatchHistories
            .Include(wh => wh.Content)
            .GroupBy(wh => wh.ContentId)
            .OrderByDescending(g => g.Count())
            .Take(10)
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
                x.Content.Type,
                x.WatchCount
            })
            .ToListAsync();

        return Ok(new
        {
            statistics = new
            {
                totalUsers,
                activeUsers,
                totalContent,
                activeContent,
                totalSubscriptions,
                totalRevenue
            },
            recentUsers,
            topContent
        });
    }

    // GET: api/admin/users
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var totalCount = await _context.Users.CountAsync();

        var users = await _context.Users
            .Include(u => u.Profiles)
            .Include(u => u.Subscriptions)
            .OrderByDescending(u => u.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => new
            {
                u.Id,
                u.Email,
                u.FirstName,
                u.LastName,
                u.Role,
                u.CreatedAt,
                u.IsActive,
                ProfileCount = u.Profiles.Count,
                HasActiveSubscription = u.Subscriptions.Any(s => s.Status == "Active")
            })
            .ToListAsync();

        return Ok(new
        {
            users,
            totalCount,
            page,
            pageSize,
            totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
        });
    }

    // PUT: api/admin/users/{id}/status
    [HttpPut("users/{id}/status")]
    public async Task<IActionResult> UpdateUserStatus(int id, [FromBody] UpdateUserStatusRequest request)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound(new { message = "User not found." });

        user.IsActive = request.IsActive;
        await _context.SaveChangesAsync();

        return Ok(new { message = "User status updated successfully." });
    }

    // PUT: api/admin/users/{id}/role
    [HttpPut("users/{id}/role")]
    public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UpdateUserRoleRequest request)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound(new { message = "User not found." });

        user.Role = request.Role;
        await _context.SaveChangesAsync();

        return Ok(new { message = "User role updated successfully." });
    }

    // GET: api/admin/analytics
    [HttpGet("analytics")]
    public async Task<IActionResult> GetAnalytics([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var start = startDate ?? DateTime.UtcNow.AddMonths(-1);
        var end = endDate ?? DateTime.UtcNow;

        var userRegistrations = await _context.Users
            .Where(u => u.CreatedAt >= start && u.CreatedAt <= end)
            .GroupBy(u => u.CreatedAt.Date)
            .Select(g => new { Date = g.Key, Count = g.Count() })
            .OrderBy(x => x.Date)
            .ToListAsync();

        var revenueByDate = await _context.Payments
            .Where(p => p.Status == "Completed" && p.PaymentDate >= start && p.PaymentDate <= end)
            .GroupBy(p => p.PaymentDate.Date)
            .Select(g => new { Date = g.Key, Revenue = g.Sum(p => (double)p.Amount) })
            .OrderBy(x => x.Date)
            .ToListAsync();

        var contentByGenre = await _context.Contents
            .Where(c => c.IsActive && !string.IsNullOrEmpty(c.Genre))
            .GroupBy(c => c.Genre)
            .Select(g => new { Genre = g.Key, Count = g.Count() })
            .OrderByDescending(x => x.Count)
            .ToListAsync();

        var watchActivity = await _context.WatchHistories
            .Where(wh => wh.WatchedAt >= start && wh.WatchedAt <= end)
            .GroupBy(wh => wh.WatchedAt.Date)
            .Select(g => new { Date = g.Key, WatchCount = g.Count() })
            .OrderBy(x => x.Date)
            .ToListAsync();

        return Ok(new
        {
            userRegistrations,
            revenueByDate,
            contentByGenre,
            watchActivity
        });
    }
}

public class UpdateUserStatusRequest
{
    public bool IsActive { get; set; }
}

public class UpdateUserRoleRequest
{
    public string Role { get; set; } = null!;
}

