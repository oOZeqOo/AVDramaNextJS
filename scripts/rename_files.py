import os

PARENT_DIR = os.path.abspath('.')
MORE_IMAGES_DIR = './public/images/more_images/'
MORE_IMAGES_DATA_FILE = './src/assets/data/ImageGalleryData.js'

def rename_more_images_folder(starting=200) -> list[str]:
    file_names = []
    files = os.listdir('.')
    total_files = len(files) + starting
    for index, file in enumerate(files[::-1]):
        end = file.split('.')[1].lower()
        if end == 'jpeg':
            end = 'jpg'

        number = f"{total_files - index}".rjust(4, "0")
        new_name = number + "." + end
        file_names.append(new_name)

        if new_name == file:
            continue

        try:
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
    files = rename_more_images_folder()
    set_this_dir(PARENT_DIR)
    set_up_more_images_data(files)
