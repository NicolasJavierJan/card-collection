const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createLocation(location: { name: string; type: "Binder" | "BTB" }) {
  const res = await fetch(`${API_BASE}/api/locations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(location),
  });

  if (!res.ok) {
    throw new Error("Failed to create location");
  }

  return res.json();
}
