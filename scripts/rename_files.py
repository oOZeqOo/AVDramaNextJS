import os

PARENT_DIR = os.path.abspath('.')
MORE_IMAGES_DIR = './public/images/more_images/'
MORE_IMAGES_DATA_FILE = './src/assets/data/ImageGalleryData.js'

def rename_more_images_folder() -> list[str]:
    file_names = []
    files = os.listdir('.')
    for index, file in enumerate(files):
        end = file.split('.')[1].lower()
        if end == 'jpeg':
            end = 'jpg'
        new_name = f'{index + 201}'.rjust(4, '0') + '.' + end
        file_names.append(new_name)
        if new_name == file:
            continue

        os.rename(file, new_name)
        print(f'Renamed {file} -> {new_name}')
    return file_names


def set_up_more_images_data(files: list[str]) -> None:

    data = ''.join([f'    "{file}",\n' for file in files])
    template =  'export const imageGalleryData = {\n' \
                '  "/images/more_images/": [\n' \
                f'{data} ' \
                '  ],\n' \
                '};'

    print(template)
    with open(MORE_IMAGES_DATA_FILE, 'w+') as file:
        file.write(template)

def set_this_dir(dir) -> None:
    os.chdir(dir)

if __name__ == '__main__':
    set_this_dir(MORE_IMAGES_DIR)
    files = rename_more_images_folder()
    set_this_dir(PARENT_DIR)
    set_up_more_images_data(files)
