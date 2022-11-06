"""main entry point into the application"""

""" 
IMPORTS
"""
import typer
from pathlib import Path
from zipfile import ZipFile
from requests import get
from io import StringIO
from enum import Enum


""" 
DEFINE GLOBALS
"""
app = typer.Typer()
export_templates = "export_templates.tpz"
class OS_NAME(Enum):
    WINDOWS_64 = "win64.exe.zip"
    WINDOWS_32 = "win32.exe.zip"
    MAC = "macos.universal.zip"
    LINUX_64 = "linux.x86_64.zip"
    LINUX_32 = "linux.x86_32"



""" 
CLI
"""
@app.callback
def callback():
    pass


@app.command
def init(
    directory: str = typer.Argument(
        ...,
        help = 'The diretory to store the currently enabled Godot version'
    )
)


@app.command
def use(
    version: str = typer.Argument(
        ...,
        help = 'The version of Godot to use. Should look like "3.4", "3.5.1", etc. If an alpha, beta, rc or other is required, append it with a dash, such as "4.0-beta3". Do not include anything about mono versions.',
    ),
    os: str = typer.Argument(
        "win64",
        help = 'The operating system to use. It can be: "win32", "win64", "linux32", "linux64", or "mac". Android and web versions are not supported by gdvm.'
    ),
    mono: bool = typer.Option(
        False,
        help = "Whether to use the mono version, if applicable."
    ),
) -> None:
    """ 
    Switches the currently used version of Godot to the specified version. If the specified version is not installed on the user's system, it is downloaded from the tuxfamily repo.
    """

    match os:
        case "win64":
            os_name = OS_NAME.WINDOWS_64
        case "win32":
            os_name = OS_NAME.WINDOWS_32
        case "mac":
            os_name = OS_NAME.MAC
        case "linux64":
            os_name = OS_NAME.LINUX_64
        case "linux32":
            os_name = OS_NAME.LINUX_32
        case _:
            typer.echo(f'Operating system {os} not recognized. Please use either "win32", "win64", "linux32", "linux64", or "mac" as the os.')
            return
    
    

    mono_string = "enabled" if mono else "disabled"
    typer.echo(f"Switched version to {version} with mono {mono_string}")


""" 
HELPER FUNCTIONS
"""
def download_zip(url: str, directory: str) -> bool:
    """downloads a zip file from a url and saves it to a specified directory

    Args:
        url (str): the url of the zip to download. Must include the .zip suffix
        directory (str): the directory to save the zip to

    Returns:
        bool: _description_
    """
    with get(url, stream=True) as request:
        if request.status_code == 200:
            zip = ZipFile(StringIO(request.content))
            zip.extractall(directory)

            return True
    
    return False


def get_url(version: str, mono: bool, os: OS_NAME) -> str:
    """creates a url to the zip archive containing the specified version of Godot

    Args:
        version (str): the version of Godot to use. Same thing as the version argument in the use command
        mono (bool): whether to use mono or not

    Returns:
        str: the url to the zip archive
    """    
    pass


""" 
START APPLICATION
"""
if __name__ == "__main__":
    app()
