import itertools
import json
import os
from time import perf_counter

import cv2
from skimage.metrics import structural_similarity as ssim

IMG_CACHE = {}

def get_image_similarity(imageA, imageB):
    try:
        # Compute SSIM between two images
        (score, _) = ssim(imageA, imageB, full=True)
    except ValueError:
        return None
    return score

def check_cache(image_dir, img_path):
    img_path = os.path.join(image_dir, img_path)
    if img_path not in IMG_CACHE.keys():
        img = cv2.imread(img_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        IMG_CACHE[img_path] = img

    return IMG_CACHE[img_path]

def find_similar_images(folder_path, db_file):
    print('Finding Similar Images')
    # Load the existing image similarity database (if it exists)
    if os.path.isfile(db_file):
        with open(db_file, 'r') as f:
            image_db = json.load(f) or []
    else:
        image_db = []
    similar = []
    files_to_move = []
    # Iterate over all image pairs in the directory
    image_files = [f for f in os.listdir(folder_path) if f.lower().split('.')[1] in ["jpg", 'jpeg', 'png']]
    start = perf_counter()
    for i, image1_file in enumerate(image_files):
        print(f'\r - Checking image: {i + 1:>4} of {len(image_files):<4} - {image1_file:<30}', end="\r")

        if image1_file in image_db:
            continue

        if image1_file not in image_db:
            image_db.append(image1_file)

        imageA = check_cache(folder_path, image1_file)
        for image2_file in image_files[i + 1:]:
            # Check if the image pair has already been checked
            if image1_file == image2_file:
                continue

            imageB = check_cache(folder_path, image2_file)
            similarity = get_image_similarity(imageA, imageB)

            if similarity is None:
                continue

            if similarity >= 0.9:
                string = f"{image1_file} and {image2_file} are {similarity*100:.2f}% similar"
                string_rev = f"{image2_file} and {image1_file} are {similarity*100:.2f}% similar"
                if string not in similar and string_rev not in similar and image2_file not in files_to_move:
                    similar.append(string)
                    files_to_move.append(image2_file)



    print('\n')
    if len(similar) < 1:
        print('All good ✅')
    for s in similar:
        print(s)

    dup_dir = './public/images/more_images_duplicates/'
    if len(files_to_move) > 1:
        print(f'\nMoving duplicates to: `{dup_dir}`')
        for file in files_to_move:
            os.makedirs(dup_dir, exist_ok=True)
            os.rename(os.path.join(folder_path, file), os.path.join(dup_dir, file))
        print()

    print(f'Finished checking {len(image_files)} in {round(perf_counter() - start, 3)} s')
    # Save the updated image similarity database to file
    with open(db_file, 'w') as f:
        image_db.sort()
        json.dump(image_db, f, indent=2)


def main() -> None:
    image_dir = "./public/images/more_images"
    db_file = './scripts/image_similarity.json'
    find_similar_images(image_dir, db_file)


if __name__ == '__main__':
    main()
