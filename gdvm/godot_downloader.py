from gdvm import __godot_repo__, OS_NAME, SUCCESS, FILE_ERROR
from pathlib import Path
from urllib.request import urlopen
from zipfile import ZipFile
from os.path import exists
from os import makedirs, rmdir
from shutil import rmtree
import typer


def get_download_url(version: str, os: OS_NAME, release: str = "stable",  mono: bool = False) -> str:
    """Returns a url to the zip file containing the requestsed version of Godot.

    Args:
        version (str): The version of Godot to use. Does not include the 'v'. Examples: 1.1, 3.0.1, 4.0.
        release (str): A prelease or release candidate to use. If nothing is given, it defaults to "stable". Examples: beta4, rc1, pre-alpha, alpha10.
        os (OS_NAME): The OS from the OS_NAME enum.
        mono (bool): Whether to use the mono version or not

    Returns:
        str: The url to the download
    """

    # get to the correct directory
    url = f"{__godot_repo__}/{version}/"
    
    if release != "stable":
        url += f"{release}/"
    
    if mono:
        url += "mono/"
    
    # append the actual zip file
    url += f"Godot_v{version}-{release}"
    if mono:
        url += "_mono"
    url += f"_{str(os)}"


    # if the version is greater than or equal to 4, replace x11. with x86_
    if int(version[0]) >= 4:
        url = url.replace("x11.", "linux.x86_")
    
    # stupid mono thing
    if mono:
        url = url.replace("x11.", "x11_")

    return url


def download_zip(url: str, save_directory: Path) -> int:
    """Downloads a zip from a url and saves 

    Args:
        url (str): the url to get the zip from
        save_directory (Path): the folder to save the zip inside of

    Returns:
        int: Either an error code or "SUCCESS". See gdvm/__init__.py
    """
    
    # clear the directory if it exists
    save_directory_string = save_directory.absolute().as_posix()
    if exists(save_directory_string):
        rmtree(save_directory_string)
    
    # create the directory
    makedirs(save_directory)

    # install the zip file from the internet
    # note - this is kept as a zip file to save space
    response = urlopen(url)
    with open(save_directory / "godot.zip", "wb") as zip:
        zip.write(response.read())
        zip.close()
        return SUCCESS
    
    return FILE_ERROR