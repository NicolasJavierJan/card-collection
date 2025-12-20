// components/Sidebar.tsx
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { fetchCardSets } from "@/lib/apiCardSets";
import type { CardSet } from "@/models/CardSet";

export default function Sidebar() {
  const [sets, setSets] = useState<CardSet[]>([]);
  const [setsOpen, setSetsOpen] = useState(false);

  useEffect(() => {
    fetchCardSets()
      .then((s) => setSets(s))
      .catch(console.error);
  }, []);

  return (
    <aside
      style={{
        width: "300px",
        backgroundColor: "#e3edf7",
        borderRight: "1px solid #c9d4e3",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        height: "100%", // use 100% of parent flex container
      }}
    >
      {/* ACTIONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <SidebarButton href="/add-cards" label="+ Add Cards" />
        <SidebarButton href="/add-sets" label="+ Add Sets" />
        <SidebarButton href="/add-locations" label="+ Add Locations" />
        <SidebarButton href="/move-sets" label="Move Sets" />
      </div>

      {/* NAVIGATION */}
      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <SidebarNavLink href="/my-collection" label="Collection" />
        <SidebarNavLink href="/card-dex" label="Card Dex" />

        {/* Sets dropdown */}
        <div>
          <button
            onClick={() => setSetsOpen(!setsOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#0050b8",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
              width: "100%",
            }}
          >
            {setsOpen ? "Hide Sets ▲" : "Show Sets ▼"}
          </button>

          {setsOpen &&
            sets.map((set) => (
              <SidebarNavLink
                key={set.id}
                href={`/sets/${set.id}`}
                label={set.name}
                small
              />
            ))}
        </div>
      </div>
    </aside>
  );
}

/* ----------------- COMPONENTS ----------------- */
function SidebarButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        backgroundColor: "#0070f3",
        color: "#fff",
        fontWeight: 600,
        textDecoration: "none",
        textAlign: "center",
        transition: "0.2s",
        border: "2px solid transparent",
      }}
    >
      {label}
    </Link>
  );
}

function SidebarNavLink({
  href,
  label,
  small,
}: {
  href: string;
  label: string;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        color: "#0050b8",
        fontWeight: small ? 500 : 600,
        fontSize: small ? "0.9rem" : "1rem",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}
