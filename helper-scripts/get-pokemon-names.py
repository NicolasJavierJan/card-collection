import requests
import time
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
                # Escape single quotes for SQL
                escaped_name = english_name.replace("'", "''")
                names.append(escaped_name)
        except Exception as e:
            print(f"Error fetching Pokémon ID {pokemon_id}: {e}")
            continue

        time.sleep(0.1)

    return names

CACHE_FILE = "pokemon_species.sql"

if os.path.exists(CACHE_FILE):
    print("Loading from cache (already formatted for SQL).")
else:
    print("Fetching Pokémon species from API...")
    pokemon_names = fetch_species_by_id()

    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        f.write("INSERT INTO pokemon_species (name) VALUES\n")

        for i, name in enumerate(pokemon_names):
            f.write(f"('{name}')")

            is_last = i == len(pokemon_names) - 1
            end_of_line = (i + 1) % 6 == 0 or is_last

            if not is_last:
                f.write(", ")

            if end_of_line:
                f.write("\n")
            else:
                f.write(" ")

    print("Saved Pokémon species list to SQL file.")

print(f"\nTotal species written: {len(open(CACHE_FILE).readlines()) - 1}")
