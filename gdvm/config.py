""" Module for handling the configuration file """

from tomlkit import dumps
from tomlkit import parse

from pathlib import Path

import typer


from gdvm import (
    DIR_ERROR, FILE_ERROR, SUCCESS, __app_name__, OS_NAME
)

CONFIG_DIR_PATH = Path(typer.get_app_dir(__app_name__))
CONFIG_FILE_PATH = CONFIG_DIR_PATH / "config.toml"


def init_config_file() -> int:
    try:
        CONFIG_DIR_PATH.mkdir(exist_ok = True)
    except OSError:
        return DIR_ERROR
    try:
        CONFIG_FILE_PATH.touch(exist_ok = True)
    except OSError:
        return FILE_ERROR

    typer.echo(f"Configuration file created at {CONFIG_FILE_PATH}.")
    return SUCCESS


"""
ABSTRACTED INTERFACE
"""
def save_os(os: OS_NAME) -> int:
    """Saves the os to the config file

    Args:
        os (OS_NAME): The name of the operating system from the OS_NAME enum

    Returns:
        int: An error code
    """
    typer.echo(f"OS Saved as {str(os)}")
    return _edit_config("os", str(os))


def get_os() -> OS_NAME:
    """Returns the OS Name

    Returns:
        OS_NAME: the os from the OS_NAME enum
    """
    return _get_config("os")


def save_godot_dir(path: Path) -> int:
    """Saves the path of the godot directory

    Args:
        dir (Path): the path to the godot directory

    Returns:
        int: error code
    """
    typer.echo(f"Godot will be in {path.absolute().as_posix()}.")
    return _edit_config("godot_directory", path.absolute().as_posix())


def get_godot_dir() -> Path:
    """returns the path of the godot directory

    Returns:
        Path: the path to the godot directory
    """
    return Path(_get_config("godot_directory"))


def assert_config_exists() -> bool:
    """Asserts that the config file exists

    Returns:
        bool: true if the config file exists, false otherwise
    """    
    return CONFIG_FILE_PATH.exists()


"""
PRIVATE METHODS
"""
def _get_config(key: str) -> dict:
    try:
        file = CONFIG_FILE_PATH.open("r")
        return parse(file)[key]
    except OSError:
        return FILE_ERROR


def _edit_config(key: str, value) -> int:
    try:
        toml_data = ""
        with CONFIG_FILE_PATH.open("r") as file:
            toml_data = parse(file.read())
            toml_data[key] = value
        
        with CONFIG_FILE_PATH.open("w") as file:
            file.write(dumps(toml_data))
        
        return SUCCESS
        
    except OSError:
        return FILE_ERROR