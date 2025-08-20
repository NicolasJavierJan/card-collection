const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCardRecommendation = async (newCard : any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add-card/card-recommendation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCard),
    });
    const data = await res.json();

    console.log(data.recommendation, data.message);
    return data.message;
}