// components/Sidebar.tsx
"use client";

import React from 'react';

interface SidebarProps {
  onCollectionClick: () => void;
}

export default function Sidebar({ onCollectionClick }: SidebarProps) {
  return (
    <aside style={{ width: '200px', borderRight: '1px solid #ddd', padding: '1rem' }}>
      <h2>Menu</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={onCollectionClick}
        >
          My Collection
        </li>
      </ul>
    </aside>
  );
}
