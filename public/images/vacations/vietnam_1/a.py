import json
import os


def set_this_dir() -> None:
    abs_path = os.path.abspath(__file__)
    d_name = os.path.dirname(abs_path)
    os.chdir(d_name)

set_this_dir()

files = []
data = []

for paths in os.walk('.'):
    files = paths[2]


for file in files:
    print(f'"/vietnam_1/{file}",')
print(data)
