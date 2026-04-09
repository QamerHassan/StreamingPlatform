namespace StreamingPlatform.API.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Role { get; set; } = "User";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;

    public required List<Profile> Profiles { get; set; }
    public List<Subscription> Subscriptions { get; set; } = new();
    public List<Payment> Payments { get; set; } = new();
}
