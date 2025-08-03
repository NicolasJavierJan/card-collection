// components/RecommendationModal.tsx
"use client";

import React from "react";
import { PokemonCard } from "@/models/PokemonCard";
import Card from "./Card"; 

type Props = {
  cards: PokemonCard[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
};

export default function RecommendationModal({ cards, currentIndex, onClose, onNavigate }: Props) {
  const card = cards[currentIndex];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1rem",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() =>
              onNavigate(currentIndex > 0 ? currentIndex - 1 : cards.length - 1)
            }
          >
            ←
          </button>

          <Card card={card} />

          <button
            onClick={() =>
              onNavigate(currentIndex < cards.length - 1 ? currentIndex + 1 : 0)
            }
          >
            →
          </button>
        </div>

        <p style={{ fontSize: "0.9rem", color: "#444" }}>
          {currentIndex + 1} / {cards.length}
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            backgroundColor: "#eee",
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
