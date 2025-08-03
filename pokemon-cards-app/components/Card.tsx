import React from "react";
import { PokemonCard } from "../models/PokemonCard";

type Props = {
  card: PokemonCard;
  actions?: React.ReactNode;
};

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Card({ card, actions }: Props) {
  return (
    <div
      style={{
        width: "240px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      
      {card.imagePath && (
        <img
          src={`${baseUrl}${card.imagePath}`}
          alt={card.cardName}
          style={{
            width: "240px",
            objectFit: "contain",
            display: "block",
            borderRadius: "6px",
          }}
        />
      )}

      
      <div
        style={{
          width: "100%",
          padding: "0.5rem 0.5rem 0",
          boxSizing: "border-box",
        }}
      >
        
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            margin: "0 0 0.4rem",
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          {card.cardName}
        </h2>

        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#444",
            marginBottom: "0.6rem",
            lineHeight: 1.3,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div>#{card.cardNumber}</div>
            <div>{card.setName}</div>
          </div>

          {card.locationName && (
            <div
              style={{
                textAlign: "right",
                fontStyle: "italic",
                fontSize: "0.75rem",
                color: "#666",
                whiteSpace: "nowrap",
              }}
            >
              {card.locationName}
            </div>
          )}
        </div>

        {actions && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.4rem",
              width: "100%",
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
