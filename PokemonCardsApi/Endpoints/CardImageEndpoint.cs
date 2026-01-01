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
            string? cardNumberRaw = query["cardNumber"];

            if (string.IsNullOrWhiteSpace(languageCode) ||
                string.IsNullOrWhiteSpace(setCode) ||
                string.IsNullOrWhiteSpace(cardNumberRaw))
            {
                return Results.BadRequest(new { error = "Missing query parameters" });
            }

            if (!int.TryParse(cardNumberRaw, out int cardNumber))
            {
                return Results.BadRequest(new { error = "Invalid cardNumber" });
            }

            var imagePath =
                app.Configuration["ImagePath"]
                ?? Environment.GetEnvironmentVariable("IMAGE_PATH");

            if (string.IsNullOrEmpty(imagePath) || !Directory.Exists(imagePath))
            {
                return Results.Problem("Image path is not configured or does not exist.");
            }

            string[] extensions = { "png", "jpg", "jpeg", "webp" };

            foreach (var ext in extensions)
            {
                string numberPart = languageCode.Equals("ja", StringComparison.OrdinalIgnoreCase)
                    ? cardNumber.ToString("D3") // 001, 012, 099
                    : cardNumber.ToString();   // 1, 12, 99

                string filePath = Path.Combine(
                    imagePath,
                    languageCode,
                    setCode,
                    $"{setCode}-{numberPart}.{ext}"
                );

                if (File.Exists(filePath))
                {
                    string relativeUrl =
                        $"/static-images/{languageCode}/{setCode}/{setCode}-{numberPart}.{ext}";

                    return Results.Ok(new { imageUrl = relativeUrl });
                }
            }

            return Results.Ok(new { imageUrl = (string?)null });
        });
    }
}
