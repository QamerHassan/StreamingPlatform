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
public class PaymentController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public PaymentController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("create-checkout-session")]
    public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutRequest request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
            return Unauthorized();

        // Plan pricing
        var planPrices = new Dictionary<string, decimal>
        {
            { "basic", 5.99m },
            { "standard", 9.99m },
            { "premium", 14.99m }
        };

        if (!planPrices.ContainsKey(request.PlanId))
            return BadRequest(new { message = "Invalid plan ID." });

        var amount = planPrices[request.PlanId];

        // In a real implementation, you would integrate with Stripe here
        // For now, we'll create a subscription record directly
        var subscription = new Subscription
        {
            UserId = userId,
            PlanType = request.PlanId,
            Status = "Active",
            StartDate = DateTime.UtcNow,
            EndDate = DateTime.UtcNow.AddMonths(1),
            StripeCustomerId = $"cus_{Guid.NewGuid()}",
            StripeSubscriptionId = $"sub_{Guid.NewGuid()}"
        };

        _context.Subscriptions.Add(subscription);
        await _context.SaveChangesAsync();

        // Create payment record
        var payment = new Payment
        {
            UserId = userId,
            SubscriptionId = subscription.Id,
            Amount = amount,
            Currency = "USD",
            PaymentMethod = request.PaymentMethod ?? "card",
            Status = "Completed",
            TransactionId = $"txn_{Guid.NewGuid()}",
            PaymentDate = DateTime.UtcNow
        };

        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            subscriptionId = subscription.Id,
            message = "Subscription created successfully."
        });
    }

    [HttpGet("subscription")]
    public async Task<IActionResult> GetCurrentSubscription()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var subscription = await _context.Subscriptions
            .Where(s => s.UserId == userId && s.Status == "Active")
            .OrderByDescending(s => s.StartDate)
            .FirstOrDefaultAsync();

        if (subscription == null)
            return NotFound(new { message = "No active subscription found." });

        return Ok(new
        {
            id = subscription.Id,
            planType = subscription.PlanType,
            status = subscription.Status,
            startDate = subscription.StartDate,
            endDate = subscription.EndDate
        });
    }

    [HttpPost("cancel-subscription")]
    public async Task<IActionResult> CancelSubscription()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var subscription = await _context.Subscriptions
            .Where(s => s.UserId == userId && s.Status == "Active")
            .OrderByDescending(s => s.StartDate)
            .FirstOrDefaultAsync();

        if (subscription == null)
            return NotFound(new { message = "No active subscription found." });

        subscription.Status = "Cancelled";
        subscription.CancelledAt = DateTime.UtcNow;
        subscription.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Subscription cancelled successfully." });
    }

    [HttpGet("payment-history")]
    public async Task<IActionResult> GetPaymentHistory()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var payments = await _context.Payments
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.PaymentDate)
            .Select(p => new
            {
                id = p.Id,
                amount = p.Amount,
                currency = p.Currency,
                paymentMethod = p.PaymentMethod,
                status = p.Status,
                paymentDate = p.PaymentDate
            })
            .ToListAsync();

        return Ok(payments);
    }
}

public class CreateCheckoutRequest
{
    public string PlanId { get; set; } = null!;
    public string? PaymentMethod { get; set; }
}

