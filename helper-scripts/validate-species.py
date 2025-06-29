import os
import json
import openpyxl
from dotenv import load_dotenv

load_dotenv()

excel_file_path = os.getenv("POKEMON_COLLECTION_PATH")

if not excel_file_path:
    raise ValueError("POKEMON_COLLECTION_PATH not found in .env file!")

with open("official_pokemon_species.json", "r", encoding="utf-8") as f:
    official_names = set(json.load(f))

print(f"Opening Excel file from: {excel_file_path}")
wb = openpyxl.load_workbook(excel_file_path)
sheet = wb["Collection"]

species_column = []
for idx, row in enumerate(sheet.iter_rows(min_row=2, min_col=2, max_col=2, values_only=True), start=2):
    species = row[0]
    if species:
        species_column.append((idx, species.strip()))

print("\n Checking for mismatched or unknown Pokémon names...\n")
invalid_species = []

for row_number, name in species_column:
    if name not in official_names:
        invalid_species.append((row_number, name))
        print(f"Row {row_number}: '{name}' not found in official list")


if not invalid_species:
    print("All Pokémon names are valid!")
else:
    print(f"\nFound {len(invalid_species)} invalid or mismatched names.")