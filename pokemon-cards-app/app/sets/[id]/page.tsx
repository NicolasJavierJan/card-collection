"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SetCard } from "@/models/SetCard";
import SetCardCard from "@/components/SetCardCard";

export default function SetPage() {
  const { id } = useParams();
  const [cards, setCards] = useState<SetCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buttonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "background 0.2s",
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/card-sets/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load set");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.checklist)) {
          setCards(data.checklist);
        } else {
          console.warn("Unexpected API structure:", data);
          setCards([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Cards in Set {id}
      </h1>

      {cards.length === 0 ? (
        <p>No cards found for this set.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          {cards.map((card, idx) => (
            <SetCardCard
              key={`${card.cardNumber}-${idx}`}
              card={card}
              actions={
                <>
                  <button style={buttonStyle}>Move</button>
                  <button style={buttonStyle}>Delete</button>
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
