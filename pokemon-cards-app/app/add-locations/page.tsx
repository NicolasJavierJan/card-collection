"use client";

import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { createLocation } from "@/lib/apiLocations";

type LocationType = "Binder" | "BTB";

export default function AddLocationPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState<LocationType>("Binder");
  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

const handleConfirm = async () => {
  setShowConfirm(false);
  try {
    await createLocation({ name, type });
    console.log("Location created:", { name, type });
    setName("");
    setType("Binder");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Add Location</h1>

      <form onSubmit={openConfirm} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value as LocationType)}
            required
          >
            <option value="Binder">Binder</option>
            <option value="Box">Box</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Location
        </button>
      </form>

      {showConfirm && (
        <ConfirmationModal
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
        >
          <h2 className="text-lg font-semibold mb-2">Confirm New Location</h2>
          <p className="mb-1"><strong>Name:</strong> {name}</p>
          <p><strong>Type:</strong> {type === "BTB" ? "Box (BTB)" : "Binder"}</p>
        </ConfirmationModal>
      )}
    </div>
  );
}
