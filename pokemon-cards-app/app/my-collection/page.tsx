"use client";

import { useEffect, useState, useRef } from "react";
import { fetchAllCards } from "../../lib/api";
import Card from "../../components/Card";
import { PokemonCard } from "../../models/PokemonCard";

export default function MyCollectionPage() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const LIMIT = 20;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const loadingRef = useRef(false);

  const loadMore = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);
    try {
      const newCards = await fetchAllCards(offset, LIMIT);
      setCards(prev => [...prev, ...newCards]);
      setOffset(prev => prev + LIMIT);
      if (newCards.length < LIMIT){
        setHasMore(false);
      } 
    } catch (err: any){
      setError(err.message);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }

  useEffect(() => {
    loadMore()
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >= container.scrollHeight - 300 &&
        !loading && hasMore
      ) {
        loadMore();
      }
    }
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div ref={scrollContainerRef} style={{ height: "100%", overflowY: "auto", padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>My Collection</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "0.75rem",
          justifyContent: "center",
        }}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
