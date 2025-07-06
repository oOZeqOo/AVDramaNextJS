# TIMELINE_DATA_FILE = Path("src/assets/data/TimelineData.js")
import os
import re
from pathlib import Path
from collections import defaultdict
from datetime import date

year = date.today().year


# Constants
TIMELINE_DIR = Path("public/images/timeline")
TIMELINE_DATA_FILE = Path("src/assets/data/TimelineData.js")
SUNFLOWER_FILENAME = "sunflower-6.jpg"
SUNFLOWER_PATH = f"/images/timeline/{year}/{SUNFLOWER_FILENAME}"

# Month abbreviation to full name mapping
MONTH_MAP = {
    "jan": "January",
    "feb": "February",
    "mar": "March",
    "apr": "April",
    "may": "May",
    "jun": "June",
    "jul": "July",
    "aug": "August",
    "sep": "September",
    "oct": "October",
    "nov": "November",
    "dec": "December",
}

# Regex patterns
YEAR_BLOCK_PATTERN = re.compile(r"(\d{4}):\s*\[(.*?)\]", re.DOTALL)
ENTRY_PATTERN = re.compile(r"\{\s*description:.*?\},", re.DOTALL)
IMG_PATH_PATTERN = re.compile(r'imgPath:\s*"(.*?)"')
FILENAME_DATE_PATTERN = re.compile(
    r"(?P<mon>[a-z]{3})_(?P<day>\d{2})_(?P<year>\d{4})\.(?:jpg|jpeg)", re.IGNORECASE
)


def extract_year_blocks(content):
    return dict(YEAR_BLOCK_PATTERN.findall(content))


def extract_entries(content):
    return ENTRY_PATTERN.findall(content)


def extract_img_paths(content):
    return set(Path(match).name for match in IMG_PATH_PATTERN.findall(content))


def generate_entry_string(filename):
    match = FILENAME_DATE_PATTERN.match(filename)
    if not match:
        return None
    mon, day, yr = match.group("mon").lower(), match.group("day"), match.group("year")
    month_name = MONTH_MAP.get(mon)
    if not month_name:
        return None
    return f"""    {{
      description: "",
      imgClass: "img",
      imgPath: "/images/timeline/{yr}/{filename}",
      month: "{month_name}",
      title: ""
    }},"""


def sort_filenames_by_date(filenames):
    def parse_date(filename):
        match = FILENAME_DATE_PATTERN.match(filename)
        if not match:
            return (9999, 99, 99)
        mon = match.group("mon").lower()
        day = int(match.group("day"))
        year = int(match.group("year"))
        month_num = list(MONTH_MAP.keys()).index(mon) + 1
        return (year, month_num, day)

    return sorted(filenames, key=parse_date)


def update_timeline_data():
    if not TIMELINE_DATA_FILE.exists():
        print("❌ TimelineData.js not found.")
        return

    with open(TIMELINE_DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    year_blocks = extract_year_blocks(content)
    updated_blocks = {}
    sunflower_entry = None
    all_existing_filenames = extract_img_paths(content)

    # Reconstruct existing entries (preserve order)
    for year, block in year_blocks.items():
        entries = extract_entries(block)
        filtered = []
        for entry in entries:
            match = IMG_PATH_PATTERN.search(entry)
            if not match:
                continue
            img_filename = Path(match.group(1)).name
            if img_filename == SUNFLOWER_FILENAME:
                sunflower_entry = entry
            else:
                filtered.append(entry)
        updated_blocks[year] = filtered

    new_entries_by_year = defaultdict(list)

    # Scan timeline folder for new files
    for year_dir in TIMELINE_DIR.iterdir():
        if not year_dir.is_dir() or not year_dir.name.isdigit():
            continue
        year = year_dir.name
        for filename in os.listdir(year_dir):
            if not (filename.endswith(".jpg") or filename.endswith(".jpeg")):
                continue
            if filename in all_existing_filenames or filename == SUNFLOWER_FILENAME:
                continue
            entry = generate_entry_string(filename)
            if entry:
                new_entries_by_year[year].append((filename, entry))
                all_existing_filenames.add(filename)

    # Only sort the new entries before appending
    for year, new_entries in new_entries_by_year.items():
        entries_dict = dict(new_entries)
        new_sorted = [
            entries_dict[fname] for fname in sort_filenames_by_date(entries_dict.keys())
        ]
        updated_blocks.setdefault(year, []).extend(new_sorted)

    # Move sunflower entry to latest year
    if sunflower_entry:
        latest_year = str(max(map(int, updated_blocks.keys())))
        updated_blocks[latest_year].append(sunflower_entry)

    # Rebuild final file
    new_lines = ["export const timelineData = {"]
    for year in sorted(updated_blocks.keys()):
        new_lines.append(f"  {year}: [")
        new_lines.extend(updated_blocks[year])
        new_lines.append("  ],")
    new_lines.append("};")

    with open(TIMELINE_DATA_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(new_lines))

    print("✅ TimelineData.js updated with new entries (sorted).")


if __name__ == "__main__":
    update_timeline_data()
