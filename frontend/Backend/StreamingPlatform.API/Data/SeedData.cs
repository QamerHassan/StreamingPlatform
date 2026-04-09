using Microsoft.EntityFrameworkCore;
using StreamingPlatform.API.Models;

namespace StreamingPlatform.API.Data;

public static class SeedData
{
    public static async Task SeedContentAsync(ApplicationDbContext context, CancellationToken cancellationToken = default)
    {
        var existingTitles = await context.Contents
            .Select(c => c.Title)
            .ToListAsync(cancellationToken);

        var now = DateTime.UtcNow;

        var movies = new List<Content>
        {
            new()
            {
                Title = "Nebula Rising",
                Description = "A rogue pilot leads a daring mission to shut down a runaway terraforming array before it consumes an entire solar system.",
                Type = "Movie",
                Genre = "Sci-Fi",
                ReleaseYear = 2024,
                Rating = 8.7m,
                Duration = 128,
                ThumbnailUrl = "https://placehold.co/600x400?text=Nebula+Rising",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/nebula-rising.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/nebula-rising.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Silent Harbor",
                Description = "A coastal town hides a supernatural secret, and only a returning detective can uncover the truth.",
                Type = "Movie",
                Genre = "Mystery",
                ReleaseYear = 2023,
                Rating = 7.9m,
                Duration = 112,
                ThumbnailUrl = "https://placehold.co/600x400?text=Silent+Harbor",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/silent-harbor.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/silent-harbor.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Carbon Pulse",
                Description = "Near-future hackers discover an energy algorithm that can power the world—or end it.",
                Type = "Movie",
                Genre = "Thriller",
                ReleaseYear = 2022,
                Rating = 8.2m,
                Duration = 101,
                ThumbnailUrl = "https://placehold.co/600x400?text=Carbon+Pulse",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/carbon-pulse.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/carbon-pulse.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Paper Suns",
                Description = "Two siblings travel across Asia to reconcile with their estranged father before a rare celestial event.",
                Type = "Movie",
                Genre = "Drama",
                ReleaseYear = 2021,
                Rating = 8.0m,
                Duration = 119,
                ThumbnailUrl = "https://placehold.co/600x400?text=Paper+Suns",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/paper-suns.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/paper-suns.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "First Signal",
                Description = "Scientists detect a repeating message hidden in cosmic background radiation and race to decode it.",
                Type = "Movie",
                Genre = "Sci-Fi",
                ReleaseYear = 2020,
                Rating = 7.5m,
                Duration = 108,
                ThumbnailUrl = "https://placehold.co/600x400?text=First+Signal",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/first-signal.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/first-signal.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Crimson Alley",
                Description = "An undercover agent infiltrates a syndicate that controls the last free city on Earth.",
                Type = "Movie",
                Genre = "Action",
                ReleaseYear = 2024,
                Rating = 7.8m,
                Duration = 106,
                ThumbnailUrl = "https://placehold.co/600x400?text=Crimson+Alley",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/crimson-alley.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/crimson-alley.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Evergreen Echo",
                Description = "A botanist discovers a plant that mirrors human memories, forcing her to confront her past.",
                Type = "Movie",
                Genre = "Fantasy",
                ReleaseYear = 2019,
                Rating = 7.3m,
                Duration = 98,
                ThumbnailUrl = "https://placehold.co/600x400?text=Evergreen+Echo",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/evergreen-echo.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/evergreen-echo.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Midnight Comet",
                Description = "When a comet stalls in Earth's orbit, a squad of astronauts must restart its trajectory before the tides destroy civilization.",
                Type = "Movie",
                Genre = "Adventure",
                ReleaseYear = 2025,
                Rating = 8.4m,
                Duration = 130,
                ThumbnailUrl = "https://placehold.co/600x400?text=Midnight+Comet",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/midnight-comet.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/midnight-comet.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Glass Requiem",
                Description = "A concert violinist uncovers a sonic weapon encoded in a lost symphony.",
                Type = "Movie",
                Genre = "Thriller",
                ReleaseYear = 2024,
                Rating = 8.1m,
                Duration = 118,
                ThumbnailUrl = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/glass-requiem.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/glass-requiem.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Sunset Siege",
                Description = "Mercenaries defend a desert colony through a single unending night.",
                Type = "Movie",
                Genre = "Action",
                ReleaseYear = 2023,
                Rating = 7.6m,
                Duration = 105,
                ThumbnailUrl = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/sunset-siege.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/sunset-siege.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Harbor of Stars",
                Description = "An urban astronomer maps light pollution to solve her mother's disappearance.",
                Type = "Movie",
                Genre = "Drama",
                ReleaseYear = 2022,
                Rating = 7.8m,
                Duration = 122,
                ThumbnailUrl = "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/harbor-of-stars.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/harbor-of-stars.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Neon Orchard",
                Description = "In a techno-dystopian Tokyo, a botanist breeds fruit that can store memories.",
                Type = "Movie",
                Genre = "Sci-Fi",
                ReleaseYear = 2025,
                Rating = 8.3m,
                Duration = 114,
                ThumbnailUrl = "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/neon-orchard.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/neon-orchard.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Echoes of Kestrel Bay",
                Description = "A podcaster returns to her hometown to uncover who hijacked the community radio waves.",
                Type = "Movie",
                Genre = "Mystery",
                ReleaseYear = 2021,
                Rating = 7.4m,
                Duration = 102,
                ThumbnailUrl = "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/echoes-of-kestrel-bay.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/echoes-of-kestrel-bay.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Polar Meridian",
                Description = "Scientists race across the Arctic after discovering a fissure that redefines true north.",
                Type = "Movie",
                Genre = "Adventure",
                ReleaseYear = 2020,
                Rating = 7.7m,
                Duration = 116,
                ThumbnailUrl = "https://images.unsplash.com/photo-1500534310656-305bb2789e95?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/polar-meridian.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/polar-meridian.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Chal Mera Putt",
                Description = "The comedians",
                Type = "Movie",
                Genre = "Comedy",
                ReleaseYear = 2022,
                Rating = 7.7m,
                Duration = 116,
                ThumbnailUrl = "https://images.unsplash.com/photo-1500534310656-305bb2789e95?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/polar-meridian.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/polar-meridian.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
             new()
            {
                Title = "My Fault",
                Description = "Nick or Noah ",
                Type = "Movie",
                Genre = "Romance",
                ReleaseYear = 2022,
                Rating = 7.7m,
                Duration = 116,
                ThumbnailUrl = "https://images.unsplash.com/photo-1500534310656-305bb2789e95?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/polar-meridian.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/polar-meridian.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            },
            new()
            {
                Title = "Velvet Circuit",
                Description = "A street racer-turned-engineer builds a silent engine coveted by rival syndicates.",
                Type = "Movie",
                Genre = "Action",
                ReleaseYear = 2023,
                Rating = 7.9m,
                Duration = 111,
                ThumbnailUrl = "https://images.unsplash.com/photo-1478720568477-22222335e94c?auto=format&fit=crop&w=800&q=80",
                TrailerUrl = "https://cdn.streamingplatform.com/trailers/velvet-circuit.mp4",
                VideoUrl = "https://cdn.streamingplatform.com/movies/velvet-circuit.mp4",
                CreatedAt = now,
                Seasons = new List<Season>(),
                WatchHistories = new List<WatchHistory>(),
                Watchlists = new List<Watchlist>(),
                Ratings = new List<Rating>()
            }
        };

        var newMovies = movies
            .Where(movie => !existingTitles.Contains(movie.Title))
            .ToList();

        if (newMovies.Count == 0)
            return;

        await context.Contents.AddRangeAsync(newMovies, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }
}

