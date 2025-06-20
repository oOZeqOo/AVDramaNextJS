import os
import re


def rename_snapchat_files(directory):
    pattern = re.compile(r"^Snapchat-(\d+)\.(jpg|jpeg)$")

    for filename in os.listdir(directory):
        print(filename)
        match = pattern.match(filename)
        if match:
            number = match.group(1)
            new_name = f"{number:0>19}.jpg"
            src = os.path.join(directory, filename)
            dst = os.path.join(directory, new_name)
            os.rename(src, dst)
            print(f"Renamed: {filename} -> {new_name}")


if __name__ == "__main__":
    # Change this to your target directory path
    target_directory = "./public/tmp/"
    rename_snapchat_files(target_directory)
