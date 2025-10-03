import os


PATH_PREFIX = ["vietnam_1", "florida_1", "california_1"]
chosen = PATH_PREFIX[2]


def set_this_dir() -> None:
    abs_path = os.path.abspath(__file__)
    d_name = os.path.dirname(abs_path)
    os.chdir(d_name)


set_this_dir()

files = []
data = []

for paths in os.walk(f"./{chosen}"):
    files = paths[2]


for file in files:
    data.append(
        {
            "imgPath": f"/images/vacations/{chosen}/{file}",
            "title": "",
        }
    )

print(data)
