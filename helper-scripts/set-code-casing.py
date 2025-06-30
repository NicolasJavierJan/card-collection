import os
import openpyxl
from dotenv import load_dotenv

load_dotenv()

excel_file_path = os.getenv("POKEMON_COLLECTION_PATH")

if not excel_file_path:
    raise ValueError("POKEMON_COLLECTION_PATH not found in .env file!")

print(f"📂 Opening Excel file: {excel_file_path}")
wb = openpyxl.load_workbook(excel_file_path)
sheet = wb["Collection"]

headers = {cell.value: idx for idx, cell in enumerate(sheet[1])}

required_columns = ["Language", "Set Code"]
for col in required_columns:
    if col not in headers:
        raise ValueError(f"Missing required column: {col}")

lang_col_idx = headers["Language"] + 1
set_code_col_idx = headers["Set Code"] + 1

fixed_count = 0
for row in sheet.iter_rows(min_row=2):
    lang_cell = row[lang_col_idx - 1]
    code_cell = row[set_code_col_idx - 1]

    lang = lang_cell.value
    code = code_cell.value

    if not lang or not code:
        continue

    original_code = code
    if lang.upper() == "JP":
        corrected = code.lower()
    elif lang.upper() in ["EN", "ES"]:
        corrected = code.upper()
    else:
        continue

    if corrected != code:
        code_cell.value = corrected
        fixed_count += 1
        print(f"Row {row[0].row}: Fixed '{original_code}' → '{corrected}' (Language: {lang})")

# Save file with changes
wb.save(excel_file_path)
print(f"\nFixed {fixed_count} entries. File saved: {excel_file_path}")