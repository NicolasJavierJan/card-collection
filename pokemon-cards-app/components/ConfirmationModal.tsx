// components/ConfirmationModal.tsx
"use client";

import { ReactNode } from "react";

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
}

export default function ConfirmationModal({
  onClose,
  onConfirm,
  children,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        <div className="mb-4">{children}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
