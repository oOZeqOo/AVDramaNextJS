import json
import os
from time import perf_counter

import numpy as np
from keras.applications import VGG16
from keras.applications.vgg16 import preprocess_input
from keras.models import Model
from PIL import Image, ImageChops
from skimage import io
from sklearn.metrics.pairwise import cosine_similarity

cache = {}

def prepare_image(img_path):
    size = (256, 256)
    return Image.open(img_path).convert("RGB").resize(size)

def image_similarity(img1, img2):
    # Calculate the root mean square error (RMSE) between the two images
    diff = ImageChops.difference(img1, img2)
    h = diff.histogram()
    rms = (sum(h*(i**2) for i, h in enumerate(h)) / (float(img1.size[0]) * img1.size[1]))**0.5

    # Normalize the RMSE to a 0-1 scale
    similarity = 1 - (rms / 255)

    return similarity


def update_image_similarity_db(image_dir, db_file):
    # Load the existing image similarity database (if it exists)
    if os.path.isfile(db_file):
        with open(db_file, 'r') as f:
            image_db = json.load(f)
    else:
        image_db = []
    similar = []
    # Iterate over all image pairs in the directory
    image_files = [f for f in os.listdir(image_dir) if f.lower().split('.')[1] in ["jpg", 'jpeg', 'png']]
    start = perf_counter()
    for i, image1_file in enumerate(image_files):
        print(f'\rChecking image: {i + 1:>4} of {len(image_files):>4} - {image1_file:<30}', end="\r")
        for j, image2_file in enumerate(image_files, i):
            # Check if the image pair has already been checked
            if image1_file in image_db:
                continue

            similarity = compare_images_2(os.path.join(image_dir, image1_file), os.path.join(image_dir, image1_file))

            # image1 = prepare_image( os.path.join(image_dir, image1_file) )
            # # Compute the similarity between the two images
            # image2 = prepare_image( os.path.join(image_dir, image1_file))
            # similarity = image_similarity(image1, image2)
            # print(f'\n{similarity}\n')
            # # Print the result and update the image similarity database
            if similarity is None:
                continue


            if similarity >= 0.9:
                similar.append(f"{image1_file} and {image2_file} are {similarity*100:.2f}% similar")

            if image1_file not in image_db:
                image_db.append(image1_file)
    print()
    if len(similar) < 1:
        print('All good ✅')
    for s in similar:
        print(s)

    print(f'Finished checking {len(image_files)} in {round(perf_counter() - start, 3)} s')
    # Save the updated image similarity database to file
    with open(db_file, 'w') as f:
        json.dump(image_db, f, indent=4)

def check_cache(img_path, model ):
    if img_path not in cache.keys():
        img = io.imread(img_path)
        img = np.expand_dims(img, axis=0)
        img = preprocess_input(img)
        features = model.predict(img)
        flat = features.flatten()
        cache[img_path] = flat
    else:
        img = cache[img_path]
    return flat

# def compare_images(image_path1, image_path2):
#     try:
#         # Read the images
#         img1 = check_cache(image_path1)
#         img2 = check_cache(image_path2)


#         # Compute SSIM
#         similarity_index, _ = ssim(img1, img2, full=True, data_range=1.0)
#         print(similarity_index)

#         return similarity_index
#     except Exception as e:
#         print("Error occurred while comparing images:", e)
#         return None


def compare_images_2(image_path1, image_path2):
    try:
        # Load pre-trained VGG16 model (without the top classification layers)
        base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
        model = Model(inputs=base_model.input, outputs=base_model.layers[-1].output)

        # Extract features for the two images using the VGG16 model
        features1 = check_cache(image_path1, model)
        features2 = check_cache(image_path2, model)

        # Compute the similarity between the two feature vectors
        similarity = cosine_similarity([features1], [features2])[0][0]

        return similarity
    except Exception as e:
        print("Error occurred while comparing images:", e)
        return None

if __name__ == '__main__':
    image_dir = "./public/images/more_images"
    db_file = './scripts/image_similarity.json'
    update_image_similarity_db(image_dir, db_file)
