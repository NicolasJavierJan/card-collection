"use client";

import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside style={{ width: "200px", borderRight: "1px solid #ddd", padding: "1rem", flexShrink: 0}}>
      <h2>Menu</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/my-collection" style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
            My Collection
          </Link>
        </li>
      </ul>
    </aside>
  );
}
