"use client";

import { useState } from "react";
import { useFilterOptions } from "@/context/filterOptionsProvider";
import { createCardSet } from "@/lib/apiCardSets";
import ConfirmationModal from "@/components/ConfirmationModal";

interface Location {
  id: number;
  name: string;
  type: "Binder" | "CardDex" | "BTB";
}

export default function AddCardSetPage() {
  const { filterOptions } = useFilterOptions();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [totalCards, setTotalCards] = useState<number>(0);

  const [binderLocationId, setBinderLocationId] = useState<number | null>(null);
  const [boxLocationId, setBoxLocationId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

    const binderLocations: Location[] =
    (filterOptions?.locations.filter((l) => l.type === "Binder") ?? []) as Location[];

    const boxLocations: Location[] =
    (filterOptions?.locations.filter((l) => l.type === "Box") ?? []) as Location[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    setLoading(true);

    try {
      const newSet = await createCardSet({
        name,
        code,
        totalCards,
        binderLocationId: binderLocationId ? Number(binderLocationId) : undefined,
        boxLocationId: boxLocationId ? Number(boxLocationId) : undefined,
      });
    } catch (err) {
      console.error("Failed to create card set", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Add Card Set</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Set Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Set Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Cards"
          value={totalCards}
          onChange={(e) =>
            setTotalCards(e.target.value ? parseInt(e.target.value) : 0)
          }
          required
        />

        <select
          value={binderLocationId ?? ""}
          onChange={(e) =>
            setBinderLocationId(e.target.value ? Number(e.target.value) : null)
          }
          required
        >
          <option value="">Select Binder Location</option>
          {binderLocations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        <select
          value={boxLocationId ?? ""}
          onChange={(e) =>
            setBoxLocationId(e.target.value ? Number(e.target.value) : null)
          }
          required
        >
          <option value="">Select Box Location</option>
          {boxLocations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Set"}
        </button>
      </form>

      {isModalOpen && (
        <ConfirmationModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        >
          <h2>Confirm New Set</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Code:</strong> {code}
          </p>
          <p>
            <strong>Total Cards:</strong> {totalCards}
          </p>
          <p>
            <strong>Binder:</strong>{" "}
            {binderLocations.find((l) => l.id === binderLocationId)?.name}
          </p>
          <p>
            <strong>Duplicates Box:</strong>{" "}
            {boxLocations.find((l) => l.id === boxLocationId)?.name}
          </p>
        </ConfirmationModal>
      )}
    </div>
  );
}
