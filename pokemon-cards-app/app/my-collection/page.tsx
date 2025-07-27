"use client";

import { useEffect, useState, useRef } from "react";
import Card from "../../components/Card";
import { PokemonCard } from "../../models/PokemonCard";
import { fetchAllCards } from "@/lib/api";
import CardFilters from "@/components/CardFilters";

export default function MyCollectionPage() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const hasMoreRef = useRef(hasMore);

  const [filters, setFilters] = useState<{ setId: number | null; cardTypeId: number | null, locationId: number | null,
    pokemonSpeciesId: number | null, variantTypeId: number | null, trainerSubtypeId: number | null, energySubtypeId: number | null,
    pokemonTrainerId: number | null, cardLanguageId: number | null
  }>({
    setId: null,
    cardTypeId: null,
    locationId: null,
    pokemonSpeciesId: null,
    variantTypeId: null,
    trainerSubtypeId: null,
    energySubtypeId: null,
    pokemonTrainerId: null,
    cardLanguageId: null
  });

  const LIMIT = 20;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const loadMore = async (startOffset: number = offset) => {
    if (loadingRef.current || !hasMoreRef.current) return;

    console.log("Fetching with offset:", startOffset, "filters:", filters);

    loadingRef.current = true;
    setLoading(true);

    try {
      const newCards = await fetchAllCards(
        startOffset,
        LIMIT,
        filters.setId ?? undefined,
        filters.cardTypeId ?? undefined,
        filters.locationId ?? undefined,
        filters.pokemonSpeciesId ?? undefined,
        filters.variantTypeId ?? undefined,
        filters.trainerSubtypeId ?? undefined,
        filters.energySubtypeId ?? undefined,
        filters.pokemonTrainerId ?? undefined,
        filters.cardLanguageId ?? undefined
      );

      setCards((prev) => (startOffset === 0 ? newCards : [...prev, ...newCards]));
      setOffset(startOffset + LIMIT);

      if (newCards.length < LIMIT) {
        setHasMore(false);
        hasMoreRef.current = false;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    setCards([]);
    setOffset(0);
    setHasMore(true);
    hasMoreRef.current = true;
    loadingRef.current = false;
    loadMore(0);
  }, [filters]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >= container.scrollHeight - 300 &&
        !loading &&
        hasMore
      ) {
        loadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div ref={scrollContainerRef} style={{ height: "100%", overflowY: "auto", padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>My Collection</h1>

      <CardFilters
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
        }}
      />

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

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more cards.</p>}
    </div>
  );
}
