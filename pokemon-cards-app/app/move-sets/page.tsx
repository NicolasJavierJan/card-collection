"use client";

import { fetchFilterOptions, FilterOptions } from "@/lib/apiFilters";
import { useEffect, useState } from "react";

type CardSetLocationDto = {
  cardSetId: number;
  locationId: number;
};

type Location = {
  id: number;
  name: string;
  type: "Binder" | "Box" | string;
};

export default function CardSetLocationTable() {
  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [cardSetLocations, setCardSetLocations] = useState<CardSetLocationDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const filtersData = await fetchFilterOptions();
        setFilters(filtersData);

        const res = await fetch(
            // Make it's own class. TODO
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/card-set-locations`
        );
        const locationsData: CardSetLocationDto[] = await res.json();
        setCardSetLocations(locationsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading…</div>;
  if (!filters) return <div>Error loading filters</div>;

  const binders = filters.locations.filter((l) => l.type === "Binder");
  const boxes = filters.locations.filter((l) => l.type === "Box");

  const grouped = cardSetLocations.reduce((acc, csl) => {
    if (!acc[csl.cardSetId]) {
      acc[csl.cardSetId] = { cardSetId: csl.cardSetId, binders: [] as Location[], boxes: [] as Location[] };
    }
    const location = filters.locations.find((l) => l.id === csl.locationId);
    if (location?.type === "Binder") acc[csl.cardSetId].binders.push(location);
    if (location?.type === "Box") acc[csl.cardSetId].boxes.push(location);
    return acc;
  }, {} as Record<number, { cardSetId: number; binders: Location[]; boxes: Location[] }>);

  const groupedList = Object.values(grouped).sort((a, b) => {
    const setA = filters.sets.find((s) => s.id === a.cardSetId)?.name ?? "";
    const setB = filters.sets.find((s) => s.id === b.cardSetId)?.name ?? "";
    return setA.localeCompare(setB);
  });

  const handleLocationChange = async (
    cardSetId: number,
    newLocationId: string,
    type: "Binder" | "Box"
  ) => {
    try {
      const newId = parseInt(newLocationId, 10);

      if (!newLocationId) {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/card-set-locations`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardSetId, type }),
        });

        setCardSetLocations((prev) =>
          prev.filter((csl) => {
            const loc = filters.locations.find((l) => l.id === csl.locationId);
            return !(csl.cardSetId === cardSetId && loc?.type === type);
          })
        );
        return;
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/card-set-locations`, {
        method: "POST", // backend should replace if existing
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardSetId, locationId: newId }),
      });

      setCardSetLocations((prev) => {
        const updated = prev.filter((csl) => {
          if (csl.cardSetId !== cardSetId) return true;
          const loc = filters.locations.find((l) => l.id === csl.locationId);
          return loc?.type !== type;
        });
        updated.push({ cardSetId, locationId: newId });
        return updated;
      });
    } catch (err) {
      console.error("Failed to update location:", err);
    }
  };

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Card Set</th>
          <th className="p-2 border">Binders</th>
          <th className="p-2 border">Boxes</th>
        </tr>
      </thead>
      <tbody>
        {groupedList.map((group) => {
          const set = filters.sets.find((s) => s.id === group.cardSetId);
          const binderError = group.binders.length > 1;
          const boxError = group.boxes.length > 1;

          return (
            <tr key={group.cardSetId}>
              <td className="p-2 border">{set?.name ?? "Unknown Set"}</td>

              <td className="p-2 border">
                {binderError ? (
                  <span className="text-red-600 font-bold">⚠ Multiple binders!</span>
                ) : (
                  <select
                    value={group.binders[0]?.id ?? ""}
                    onChange={(e) =>
                      handleLocationChange(group.cardSetId, e.target.value, "Binder")
                    }
                  >
                    <option value="">Select Binder</option>
                    {binders.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>

              <td className="p-2 border">
                {boxError ? (
                  <span className="text-red-600 font-bold">⚠ Multiple boxes!</span>
                ) : (
                  <select
                    value={group.boxes[0]?.id ?? ""}
                    onChange={(e) =>
                      handleLocationChange(group.cardSetId, e.target.value, "Box")
                    }
                  >
                    <option value="">Select Box</option>
                    {boxes.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
