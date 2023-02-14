import os


def find_useless_console_logs(root_dir, level=1):

    if level == 1:
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

    for i, (key, values) in enumerate(files.items()):
        f_symbol = '┗' if i == len(files.keys()) - 1 else '┣'
        start = indent if i == len(files.keys()) - 1 else '┃'
        print(f' {f_symbol}{indent * (level - 3)} 📄 {key}:')

        for index, (ln, s) in enumerate(values):
            symbol = '┗' if index == len(values) - 1 else '┣'
            print(f"{indent * (level - 1)}{start}  {symbol} line: {ln:^4} - {s}")


def main() -> None:
    find_useless_console_logs("../src/components")


def set_this_dir() -> None:
    abs_path = os.path.abspath(__file__)
    dir_name = os.path.dirname(abs_path)
    os.chdir(dir_name)


if __name__ == '__main__':
    set_this_dir()
    main()
