"use client";
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { fetchAllCards } from '../lib/api';
import Card from "../components/Card";
import { PokemonCard } from "../models/PokemonCard";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const handleCollectionClick = async () => {
    try {
      const data = await fetchAllCards();
      console.log(data);
      setCards(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onCollectionClick={handleCollectionClick} />

      <main style={{ padding: '1rem', flexGrow: 1 }}>
        <h1>Welcome to Pokémon Cards</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {cards.map((card: any) => (
            <li key={card.id} style={{ listStyle: "none" }}>
              <Card card={card} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
