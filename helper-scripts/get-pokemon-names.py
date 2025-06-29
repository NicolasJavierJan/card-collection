import requests
import time
import json
import os

def fetch_species_by_id(max_id=1025):
    base_url = "https://pokeapi.co/api/v2/pokemon-species/"
    names = []

    for pokemon_id in range(1, max_id + 1):
        url = f"{base_url}{pokemon_id}/"
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()

            english_name = next(
                (name["name"] for name in data["names"] if name["language"]["name"] == "en"),
                None
            )

            if english_name:
                names.append(english_name)
        except Exception as e:
            print(f"Error fetching Pokémon ID {pokemon_id}: {e}")
            continue

        time.sleep(0.1)

    return names

CACHE_FILE = "official_pokemon_species.json"

if os.path.exists(CACHE_FILE):
    print("Loading Pokémon species from cache...")
    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        pokemon_names = json.load(f)
else:
    print("Fetching Pokémon species from API...")
    pokemon_names = fetch_species_by_id()

    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(pokemon_names, f, indent=2, ensure_ascii=False)
    print("Saved Pokémon species list to cache.")

print(f"\nTotal species loaded: {len(pokemon_names)}")