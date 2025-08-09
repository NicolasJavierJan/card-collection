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
  actions?: React.ReactNode;
};

export default function RecommendationModal({ 
  cards, 
  currentIndex, 
  onClose, 
  onNavigate,
  actions,
 }: Props) {
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
          position: "fixed",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "2rem",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            fontWeight: "bold",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ✕
        </button>

        <p style={{ fontSize: "1.2rem", color: "#444" }}>
          {currentIndex + 1} / {cards.length}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <button
            onClick={() =>
              onNavigate(currentIndex > 0 ? currentIndex - 1 : cards.length - 1)
            }
            style={{
              fontSize: "2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            ←
          </button>

          <Card card={card} />

          <button
            onClick={() =>
              onNavigate(currentIndex < cards.length - 1 ? currentIndex + 1 : 0)
            }
            style={{
              fontSize: "2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            →
          </button>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem"}}>
          {actions}
        </div>
      </div>
    </div>
  );
}
