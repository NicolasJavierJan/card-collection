import { SetCard } from "@/models/SetCard";

type Props = {
  card: SetCard;
  actions?: React.ReactNode;
};

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function SetCardCard({ card, actions }: Props) {
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
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Image */}
      {card.images?.[0] && (
        <img
          src={`${baseUrl}${card.images[0]}`}
          alt={card.cardNames[0]}
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
          #{card.cardNumber} - {card.cardNames.join(", ")}
        </h2>

        <p style={{ fontSize: "0.85rem", margin: "0.25rem 0" }}>
          Variant: {card.variant ?? "N/A"}, Type: {card.cardType ?? "N/A"}
        </p>
        <p style={{ fontSize: "0.85rem", margin: "0.25rem 0" }}>
          Languages: {card.languages.length > 0 ? card.languages.join(", ") : "N/A"}
        </p>
        <p style={{ fontSize: "0.85rem", margin: "0.25rem 0" }}>
          Locations: {card.locations.length > 0 ? card.locations.join(", ") : "N/A"}
        </p>

        {actions && (
          <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.5rem" }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
