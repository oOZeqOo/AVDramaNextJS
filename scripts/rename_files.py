import os
from collections import defaultdict

PARENT_DIR = os.path.abspath('.')
MORE_IMAGES_DIR = './public/images/more_images/'
MORE_IMAGES_DATA_FILE = './src/assets/data/ImageGalleryData.js'
DRY_RUN = False


def rename_files_sequentially(directory, offset=201, padding=4):
    """
    Renames files in the specified directory to a sequential numbering system
    with a specified offset and padding. Ensures unique numbering across different
    file extensions.

    :param directory: Path to the target directory containing files to rename.
    :param offset: Starting number for renaming (default is 200).
    :param padding: Number of digits for zero-padding in filenames (default is 4).
    """
    # Ensure the directory exists
    if not os.path.isdir(directory):
        print(f"The directory '{directory}' does not exist.")
        return

    # Dictionary to group files by their base name (without extension)
    file_groups = defaultdict(list)

    # Populate the dictionary with files grouped by base name
    for filename in os.listdir(directory):
        base_name, ext = os.path.splitext(filename)
        file_groups[base_name].append(ext)

    # Sort the base names to ensure consistent ordering
    sorted_base_names = sorted(file_groups.keys())

    # Initialize the starting number
    current_number = offset

    # Dictionary to keep track of new names to detect conflicts
    new_names = {}

    # Iterate over sorted base names and rename files
    for base_name in sorted_base_names:
        for ext in sorted(file_groups[base_name]):
            # Generate the new filename with zero-padded numbering
            new_base_name = f"{str(current_number).zfill(padding)}"
            new_filename = f"{new_base_name}{ext}"

            # Check for naming conflicts and adjust the number if necessary
            while new_filename in new_names:
                current_number += 1
                new_base_name = f"{str(current_number).zfill(padding)}"
                new_filename = f"{new_base_name}{ext}"

            # Original file path
            original_file = os.path.join(directory, f"{base_name}{ext}")

            # New file path
            new_file = os.path.join(directory, new_filename)

            # Update the new names dictionary
            new_names[new_filename] = original_file

            current_number += 1
            if original_file == new_file:
                continue

            # Rename the file
            if DRY_RUN:
                print(f"Would rename {original_file} to {new_file}")

            else:
                os.rename(original_file, new_file)
                print(f"Renamed '{original_file}' to '{new_file}'")

            # Increment the current number for the next file
    return new_names.keys()


def rename_more_images_folder(starting=200) -> list[str]:
    file_names = []
    files = os.listdir('.')
    total_files = len(files) + starting
    have = []
    print("Info:")
    print(total_files)
    for index, file in enumerate(files[::-1]):
        if index > total_files - 10:
            print(index)
        end = file.split('.')[1].lower()
        if end == 'jpeg':
            end = 'jpg'

        number = f"{total_files - index}".rjust(4, "0")
        new_name = number + "." + end
        file_names.append(new_name)
        count = total_files - index
        if count + 1 not in have:
            print(f"Missing number: {count}")
        have.append(count)

        if new_name == file:
            continue

        try:
            if DRY_RUN:
                # print(f"Would rename {file} to {new_name}")
                continue

            os.rename(file, new_name)
        except Exception as e:
            # The case where the renamed file already exists (A file was removed)
            print(e)
            if index == 0:
                rename_more_images_folder(starting + total_files + 5)
                return rename_more_images_folder(starting)

        # print(f"Renamed {file} -> {new_name}")
    print("Done Renaming")
    return file_names[::-1]


def set_up_more_images_data(files: list[str]) -> None:
    data = ''.join([f'    "{file}",\n' for file in files])
    template =  'export const imageGalleryData = {\n' \
                '  "/images/more_images/": [\n' \
                f'{data} ' \
                '  ],\n' \
                '};'
    # print(template)
    with open(MORE_IMAGES_DATA_FILE, 'w+') as file:
        file.write(template)

def set_this_dir(dirs) -> None:
    os.chdir(dirs)

if __name__ == '__main__':
    set_this_dir(MORE_IMAGES_DIR)
    files = rename_files_sequentially(".")
    if not DRY_RUN:
        set_this_dir(PARENT_DIR)
        set_up_more_images_data(files)
