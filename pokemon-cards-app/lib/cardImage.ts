export async function getCardImage(languageCode: string, setCode: string, cardNumber: string) {
  try {
    const params = new URLSearchParams({ languageCode, setCode, cardNumber });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/card-image?${params.toString()}`);

    console.log(res);

    if (!res.ok) {
      console.error("Failed to fetch image");
      return null;
    }

    const data = await res.json();

    let imageUrl: string = data.imageUrl || "";
    if (imageUrl.startsWith("/static-images")) {
      imageUrl = imageUrl.replace("/static-images", "");
    }

    return imageUrl; 
  } catch (error) {
    console.error("Error fetching card image:", error);
    return null;
  }
}
