import gdvm.config as config
from pathlib import Path
from zipfile import ZipFile
import os
from gdvm import FILE_ERROR

 
def use_godot_zip(filepath: str) -> int:
    godot_dir = config.get_godot_dir().absolute().as_posix()

    with ZipFile(filepath, 'r') as zip_ref:
        # delete everything that isn't a directory
        for filename in os.listdir(godot_dir):
            f = os.path.join(godot_dir, filename)

            if os.path.isfile(f):
                os.remove()

        
        zip_ref.extractall(godot_dir)


        # find the godot file, and rename it
        for filename in os.listdir(godot_dir):
            f = os.path.join(godot_dir, filename)

            if os.path.isfile(f) and not ".cmd" in f:  # since the only version that brings extra files around with it is the windows version, the only non-executable file will be a .cmd file.

                # TODO: figure out a way to rename the file while keeping its extension
                # probably requires more abstraction (yay!)
                pass


    return FILE_ERROR
