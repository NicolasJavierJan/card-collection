using Microsoft.AspNetCore.StaticFiles;

public static class CardImageEndpoint
{
    public static void MapCardImageEndpoint(this WebApplication app)
    {
        app.MapGet("/api/card-image", (HttpContext context) =>
        {
            var query = context.Request.Query;

            string? languageCode = query["languageCode"];
            string? setCode = query["setCode"];
            string? cardNumber = query["cardNumber"];

            if (string.IsNullOrEmpty(languageCode) || 
                string.IsNullOrEmpty(setCode) || 
                string.IsNullOrEmpty(cardNumber))
            {
                return Results.BadRequest(new { error = "Missing query parameters" });
            }

            var imagePath = app.Configuration["ImagePath"] ?? Environment.GetEnvironmentVariable("IMAGE_PATH");
            if (string.IsNullOrEmpty(imagePath) || !Directory.Exists(imagePath))
            {
                return Results.Problem("Image path is not configured or does not exist.");
            }

            string[] extensions = new[] { "png", "jpg", "jpeg", "webp" };

            foreach (var ext in extensions)
            {
                string filePath = Path.Combine(imagePath, languageCode, setCode, $"{setCode}-{cardNumber}.{ext}");
                if (File.Exists(filePath))
                {
                    string relativeUrl = $"/static-images/{languageCode}/{setCode}/{setCode}-{cardNumber}.{ext}";
                    return Results.Ok(new { imageUrl = relativeUrl });
                }
            }

            return Results.Ok(new { imageUrl = (string?)null });
        });
    }
}
