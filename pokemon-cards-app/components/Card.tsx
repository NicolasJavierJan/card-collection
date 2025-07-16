import React from "react";
import { PokemonCard } from "../models/PokemonCard";

type Props = {
  card: PokemonCard;
};

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Card({ card }: Props) {
  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "10px",
        padding: "8px 12px",
        marginBottom: "1rem",
        background: "#f9f9f9",
        width: "190px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {card.imagePath && (
        <img
          src={`${baseUrl}${card.imagePath}`}
          alt={card.cardName}
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
            borderRadius: "6px",
            marginBottom: "1rem",
            display: "block",
          }}
        />
      )}

      <h2
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          margin: "0 0 0.5rem 0",
          textAlign: "center",
          lineHeight: 1.2,
          wordBreak: "break-word",
          width: "100%",
        }}
      >
        {card.cardName}
      </h2>

      <div
        style={{
          width: "100%",
          textAlign: "left",
          marginBottom: "1.5rem",
          color: "#444",
          fontWeight: "500",
          fontSize: "0.9rem",
          lineHeight: 1.3,
        }}
      >
        <div>#{card.cardNumber}</div>
        <div>{card.setName}</div>
      </div>

      {card.locationName && (
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            fontSize: "0.8rem",
            fontStyle: "italic",
            color: "#666",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {card.locationName}
        </div>
      )}
    </div>
  );
}
