"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect, useState } from "react";

interface SetOverview {
  setId: number;
  name: string;
  binder?: string;
  box?: string;
  totalCards: number;
  missingCards: number;
}

interface RecentCard {
  id: string;
  name: string;
  setName: string;
  imageUrl?: string;
}

interface DashboardData {
  totalCards: number;
  totalSets: number;
  cardsInDex: number;
  dexCapacity: number;
  sets: SetOverview[];
  recentCards: RecentCard[];
}

export default function HomePage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard`)
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

  if (!dashboard) return <p>Loading...</p>;

  return (
    <div>
      {/* Top Section: PokéBall + Stats */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "3rem" }}>
        {/* PokéBall */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(to bottom, #cc0000 50%, #fff 50%)",
            border: "4px solid black",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              height: "4px",
              backgroundColor: "black",
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "30px",
              height: "30px",
              backgroundColor: "#fff",
              border: "4px solid black",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1.2rem" }}>
          <div>Total Cards: <strong>{dashboard.totalCards}</strong></div>
          <div>Total Sets: <strong>{dashboard.totalSets}</strong></div>
          <div>
            CardDex Completion: <strong>{dashboard.cardsInDex} / {dashboard.dexCapacity}</strong>
          </div>
        </div>
      </div>

      {/* Set Overview Section */}
      <section style={{ margin: "2rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#ddd" }}>
              <th style={{ border: "1px solid #999", padding: "0.5rem" }}>Set</th>
              <th style={{ border: "1px solid #999", padding: "0.5rem" }}>Binder</th>
              <th style={{ border: "1px solid #999", padding: "0.5rem" }}>Box</th>
              <th style={{ border: "1px solid #999", padding: "0.5rem" }}>Total Cards</th>
              <th style={{ border: "1px solid #999", padding: "0.5rem" }}>Missing</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.sets.map((s, idx) => (
              <tr key={s.setId} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#e0e0e0" }}>
                <td style={{ border: "1px solid #999", padding: "0.5rem" }}>{s.name}</td>
                <td style={{ border: "1px solid #999", padding: "0.5rem" }}>{s.binder || "-"}</td>
                <td style={{ border: "1px solid #999", padding: "0.5rem" }}>{s.box || "-"}</td>
                <td style={{ border: "1px solid #999", padding: "0.5rem" }}>{s.totalCards}</td>
                <td style={{ border: "1px solid #999", padding: "0.5rem" }}>{s.missingCards}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Recent Cards Section */}
      <section>
        <Swiper
          spaceBetween={16}
          slidesPerView={4}
          grabCursor={true}
          loop={true}
          style={{ padding: "1rem 0" }}
        >
          {dashboard.recentCards.map((c) => (
            <SwiperSlide key={c.id} style={{ width: "150px" }}>
              <div style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "0.5rem",
                backgroundColor: "#fff",
                textAlign: "center",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              }}>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${c.imageUrl}`}
                  alt={c.name}
                  style={{ width: "100%", borderRadius: "4px" }}
                />
                <p style={{ fontWeight: "bold", margin: "0.5rem 0 0 0" }}>{c.name}</p>
                <small>{c.setName}</small>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
