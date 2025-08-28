"use client";

import CardDexCard from "@/components/CardDexCard";
import { fetchCardDex } from "@/lib/apiCardDex";
import { CardDex } from "@/models/CardDex";
import { useEffect, useRef, useState } from "react";
import { fetchRecommendations } from "@/lib/apiCardDexRecommendations";
import RecommendationModal from "@/components/RecommendationModal";
import { PokemonCard } from "@/models/PokemonCard";
import { blacklistCard } from "@/lib/apiCardDexRecommendations";

export default function CardDexPage(){
    const [cards, setCards] = useState<CardDex[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hasRecommendations, setHasRecommendations] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recommendedCards, setRecommendedCards] = useState<PokemonCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const hasMoreRef = useRef(hasMore);

    const LIMIT = 20;

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);

    const buttonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "background 0.2s",
  };

  const handleBlacklist = async (cardId : string) => {
    try {
      await blacklistCard(cardId);
      setRecommendedCards((prev) => {
          const updated = prev.filter((c) => c.id !== cardId);
          if (updated.length === 0) setHasRecommendations(false);
          return updated;
        });

      if (currentIndex >= recommendedCards.length -1){
        setCurrentIndex(0);
      }
    } catch (err : any){
      console.error("Failed to blacklist card", err);
    }
  };

    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);

    const loadMore = async (startOffset: number = offset) => {
        if (loadingRef.current || !hasMoreRef.current) return;

        console.log("Fetching with offset:", startOffset);

        loadingRef.current = true;
        setLoading(true);

        try {
            const newCards = await fetchCardDex(
            startOffset,
            LIMIT,
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
      const checkRecommendations = async () => {
        try {
          const recs = await fetchRecommendations();
          if (recs.length > 0) {
            setRecommendedCards(recs);
            setHasRecommendations(true);
          }
        } catch (err: any){
          console.warn("Could not fetch recommendations: ", err);
        }
      };
      checkRecommendations();
    }, []);

    useEffect(() => {
        setCards([]);
        setOffset(0);
        setHasMore(true);
        hasMoreRef.current = true;
        loadingRef.current = false;
        loadMore(0);
    }, []);

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
              <CardDexCard key={card.id} card={card} />
            ))}
          </div>

          {hasRecommendations && (
            <div
              style={{
                position: "fixed",
                bottom: "1.5rem",
                right: "3rem",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                zIndex: 1000,
                cursor: "pointer",
              }}
              title="You have card recommendations!"
              onClick={() => setIsModalOpen(true)}
            >
              !
            </div>
          )}

          {isModalOpen && recommendedCards.length > 0 && (
            <RecommendationModal
              cards={recommendedCards}
              currentIndex={currentIndex}
              onClose={() => setIsModalOpen(false)}
              onNavigate={setCurrentIndex}
              actions={
                <>
                  <button style={buttonStyle}>Move</button>
                  <button style={buttonStyle}>Dismiss</button>
                  <button 
                  style={buttonStyle}
                  onClick={() => handleBlacklist(recommendedCards[currentIndex].id)}
                  >
                    Blacklist</button>
                </>
              }
            />
          )}
    
          {loading && <p>Loading...</p>}
          {!hasMore && <p>No more cards.</p>}
        </div>
      );
}