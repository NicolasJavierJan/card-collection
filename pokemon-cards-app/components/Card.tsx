import React from "react";
import { PokemonCardCollection } from "../models/PokemonCardCollection";

type Props = {
  card: PokemonCardCollection;
  actions?: React.ReactNode;
};

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Card({ card, actions }: Props) {
  return (
    <div
      className="
        relative
        w-full max-w-[220px]
        flex flex-col items-center
        transition-transform duration-200
        hover:scale-[1.02]
      "
    >
      {/* First Edition Badge */}
      {card.firstEdition && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow">
          1st
        </span>
      )}

      {card.imagePath && (
        <img
          src={`${baseUrl}${card.imagePath}`}
          alt={card.cardName}
          className="w-full rounded-lg object-contain"
        />
      )}

      <div className="w-full px-2 pt-2">
        {/* Name */}
        <h2 className="text-center text-base font-semibold text-blue-700 leading-tight">
          {card.cardName}
        </h2>

        {/* Info row */}
        <div className="flex justify-between text-sm text-gray-600 mt-1">
        {/* Left column */}
        <div>
          <div className="font-medium text-gray-700">
            #{card.cardNumber}
          </div>
          <div className="text-xs text-gray-600">
            {card.setName}
          </div>
        </div>

        {/* Right column */}
        <div className="text-right text-xs italic text-gray-500 whitespace-nowrap">
          {card.locationName && <div>{card.locationName}</div>}
          <div className="text-gray-400">{card.languageName}</div>
        </div>
      </div>


        {/* Actions */}
        {actions && (
          <div className="flex gap-2 mt-2 justify-between">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
