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
    .then((sets) => setSets(sets))
    .catch((err) => console.error(err));
}, []);

  return (
    <aside
      style={{
        width: "220px",
        borderRight: "1px solid #ddd",
        padding: "1rem",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2>Menu</h2>

      <Link
        href="/add-cards"
        style={{
          display: "block",
          backgroundColor: "#0070f3",
          color: "white",
          textAlign: "center",
          padding: "0.75rem 1rem",
          borderRadius: "5px",
          fontWeight: "bold",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        + Add Cards
      </Link>

      <Link
        href="/add-sets"
        style={{
          display: "block",
          backgroundColor: "#0070f3",
          color: "white",
          textAlign: "center",
          padding: "0.75rem 1rem",
          borderRadius: "5px",
          fontWeight: "bold",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        + Add Sets
      </Link>

      <Link
        href="/add-locations"
        style={{
          display: "block",
          backgroundColor: "#0070f3",
          color: "white",
          textAlign: "center",
          padding: "0.75rem 1rem",
          borderRadius: "5px",
          fontWeight: "bold",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        + Add Locations
      </Link>

            <Link
        href="/move-sets"
        style={{
          display: "block",
          backgroundColor: "#0070f3",
          color: "white",
          textAlign: "center",
          padding: "0.75rem 1rem",
          borderRadius: "5px",
          fontWeight: "bold",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        Move Sets
      </Link>

      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>

          <li>
            <Link
              href="/my-collection"
              style={{ color: "#0070f3", textDecoration: "none" }}
            >
              Collection
            </Link>
          </li>

          <li>
            <Link
              href="/card-dex"
              style={{ color: "#0070f3", textDecoration: "none" }}
            >
              Card Dex
            </Link>
          </li>

          <li style={{ marginBottom: "0.5rem" }}>
            <button
              onClick={() => setSetsOpen(!setsOpen)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontWeight: "bold",
                color: "#0070f3",
                cursor: "pointer",
                textAlign: "left",
              }}
              aria-expanded={setsOpen}
            >
              Sets {setsOpen ? "▼" : "▶"}
            </button>

            {setsOpen && (
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: "1rem",
                  marginTop: "0.5rem",
                  maxHeight: "calc(95vh - 200px)",
                  overflowY: "auto",
                }}
              >
                {sets.length === 0 ? (
                  <li style={{ fontStyle: "italic", color: "#888" }}>
                    No sets found
                  </li>
                ) : (
                  sets.map((set) => (
                    <li key={set.id} style={{ marginBottom: "0.25rem" }}>
                      <Link
                        href={`/sets/${set.id}`}
                        style={{ color: "#0070f3", textDecoration: "none" }}
                      >
                        {set.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>

        </ul>
      </nav>
    </aside>
  );
}
