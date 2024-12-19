import os
# from pprint import pprint

# from cmp_imgs import find_similar_images


def find_useless_console_logs(root_dir, level=1):
    if level == 1:
        print('Finding Useless Console Logs:')
        print(f'{root_dir}/')

    indent = " "
    files = {}
    for item in os.listdir(root_dir):
        item_path = os.path.join(root_dir, item)
        if os.path.isfile(item_path) and item.endswith(".js"):
            with open(item_path, 'rb') as f:
                lines = [(line.decode() if line.decode() else '') for line in f.readlines() ]
                stack = []
                for i, line in enumerate(lines):
                    if "console.log" in line:
                        stack.append((i + 1, line.strip()))

                if len(stack) > 0:
                    files[item] = stack
        elif os.path.isdir(item_path):
            find_useless_console_logs(item_path, level+1)

    not_missing = not files.keys()
    if level == 1 and not_missing:
        print('Nothing Found ✅')
        return

    for i, (key, values) in enumerate(files.items()):
        f_symbol = '┗' if i == len(files.keys()) - 1 else '┣'
        start = indent if i == len(files.keys()) - 1 else '┃'
        print(f' {f_symbol}{indent * (level - 3)} 📄 {key}:')

        for index, (ln, s) in enumerate(values):
            symbol = '┗' if index == len(values) - 1 else '┣'
            print(f"{indent * (level - 1)}{start}  {symbol} line: {ln:^4} - {s}")

def check_timeline_incorrect():
    location = "../src/assets/data/TimelineData.js"
    missing = []
    missing_values = ['description: ""', 'month: ""', 'title: ""', 'imgPath: ""']
    img_paths = {}
    # same = []

    contents = []
    with open(location, encoding="utf-8") as f:
        contents = f.readlines()

    for idx, line in enumerate(contents):
        if '//' in line:
            continue

        for item in missing_values:
            if item in line:
                missing.append((idx + 1, line.strip().rstrip(',')))
                break
        if "imgPath: " in line:
            img = line.strip().rstrip(',').split(" ")[-1]
            if img not in img_paths.keys():
                img_paths[img] = []
            img_paths[img].append(idx + 1)

    print('\nMissing Values:')

    if len(missing) < 1:
        print('No missing items! ✅')
    else:
        for item in missing:
            print(f"❌ {location.lstrip('../')}:{item[0]:>4} -> {item[1]}")

    print()
    print('Repeating images:')
    has_repeated = False
    for key, values in img_paths.items():
        if len(values) < 2:
            continue
        has_repeated = True
        vals = ', '.join([str(v) for v in values])
        print(f"{key:<40} on lines -> {vals:<30}")

    if not has_repeated:
        print('No repeated images! ✅\n')


def main() -> None:
    find_useless_console_logs("../src/components")

    check_timeline_incorrect()

    # image_dir = "../public/images/more_images"
    # db_file = './image_similarity.json'
    # find_similar_images(image_dir, db_file)


def set_this_dir() -> None:
    abs_path = os.path.abspath(__file__)
    dir_name = os.path.dirname(abs_path)
    os.chdir(dir_name)


if __name__ == '__main__':
    set_this_dir()
    main()
