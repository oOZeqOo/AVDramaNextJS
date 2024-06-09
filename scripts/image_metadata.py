from PIL import Image
from PIL.ExifTags import TAGS
import os
import platform, datetime

def get_image_creation_date(image_path):
    try:
        image = Image.open(image_path)
        exif_data = image._getexif()
        if exif_data:
            for tag, value in exif_data.items():
                tag_name = TAGS.get(tag, tag)
                if tag_name == 'DateTimeOriginal':
                    return value
        else:
        # Look for any custom metadata that might store creation date
            for key, value in image.info.items():
                if key.lower() in ('date:create', 'date:modify'):
                    return value
            return "No creation date found in PNG metadata."
        return "No creation date found in EXIF or PNG metadata."
    except Exception as e:
        return str(e)


# Example usage
directory = r"C:\Programs\Projects\AVDramaNextJS\scripts\test"
for item in os.listdir(directory):
    creation_date = get_image_creation_date(f'{directory}/{item}')
    print(f"{item:<30} - Creation date:", creation_date)
