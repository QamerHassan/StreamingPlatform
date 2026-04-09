namespace StreamingPlatform.API.Models;

public class Payment
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int SubscriptionId { get; set; }
    public Subscription Subscription { get; set; } = null!;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD";
    public string PaymentMethod { get; set; } = null!; // "card", "paypal", "apple_pay", "google_pay"
    public string Status { get; set; } = "Pending"; // "Pending", "Completed", "Failed", "Refunded"
    public string? StripePaymentIntentId { get; set; }
    public string? TransactionId { get; set; }
    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

