""" provides the CLI """

from typing import Optional
import typer
from gdvm import __app_name__, __version__, OS_NAME, SUCCESS
from gdvm.config import save_os, save_godot_dir, get_os, get_godot_dir, init_config_file, assert_config_exists, add_version, has_version
from pathlib import Path
from gdvm.godot_downloader import get_download_url, download_zip
from rich.progress import Progress, TextColumn, SpinnerColumn


app = typer.Typer()


"""
COMMANDS
"""
def _version_callback(value: bool):
    if value:
        typer.echo(f"{__app_name__} v{__version__}")
        raise typer.Exit()


@app.callback()
def main(
    version: Optional[bool] = typer.Option(
        None,
        "--version",
        "-v",
        help = "Shows gdvm's version",
        callback = _version_callback
    )
) -> None:
    return



@app.command(name = "init")
def init(
    os = typer.Argument(
        ...,
        help = "The operating system to install godot for. Either 'win64', 'win32', 'mac', 'lin32', or 'lin64'."
    ),
    dir = typer.Argument(
        ...,
        help = "The directory where godot will be stored. Should be empty."
    )
) -> None:
    """
    Initiates the godot dir and saves the OS. Must be done before anything else.
    """
    if init_config_file() != SUCCESS:
        typer.echo("Configuration file couldn't be initiated. Aborting.")
        raise typer.Exit()
    
    os_name: OS_NAME
    if os == "win32":
        os_name = OS_NAME.WINDOWS_32
    elif os == "win64":
        os_name = OS_NAME.WINDOWS_64
    elif os == "lin32":
        os_name = OS_NAME.LINUX_32
    elif os == "lin64":
        os_name = OS_NAME.LINUX_64
    elif os == "mac":
        os_name = OS_NAME.MAC
    else:
        typer.echo("ERROR: Please enter an OS that is either 'win64', 'win32', 'mac', 'lin32', or 'lin64'.")
        raise typer.Exit()
    
    save_os(os_name)

    path: Path
    try:
        path = Path(dir)
    except:
        typer.echo("ERROR: The path was not read properly.")
        raise typer.Exit()
    
    save_godot_dir(path)

@app.command(name = "install")
def install(
    version: str = typer.Argument(
        "",
        help = "The version of Godot to use. Examples: v3.5.1, v4.0-beta, v3.5.10-rc2"
    ),
    mono: bool = typer.Option(
        False,
        help = "Whether to use the mono version of Godot or not"
    )
) -> None:
    # confirm that the config file exists
    if not assert_config_exists():
        typer.echo("Config file not found. Please run 'gdvm init' first.")
        raise typer.Exit()

    # parse the version data
    version = version.replace("v", "")
    base_version = ""
    release = "stable"

    # TODO: add some checker to make sure the version is valid

    if "-" in version:
        split = version.split("-")
        base_version = split[0]
        release = split[1]
    else:
        base_version = version


    # get the url
    # TODO: make this work with mono versions
    # TODO: make this create an index of already installed versions
    url = get_download_url(base_version, get_os(), release, mono)
    typer.echo(f"Generated url to Godot repo '{url}'.")


    with Progress (
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        transient=True,
    ) as progress:
        progress.add_task(description=f"Downloading Godot {version}")
        path = get_godot_dir() / "versions" / str(version)
        error = download_zip(url, path)
    
    if error == SUCCESS:
        typer.echo(f"Godot successfully downloaded!")
        add_version(version)


        raise typer.Exit()



    typer.echo(f"Godot download failed. Is the URL a proper link?")
    raise typer.Exit()


@app.command(name = "use")
def use(
    version: str = typer.Argument(
        "",
        help = "The version of Godot to use. Examples: v3.5.1, v4.0-beta, v3.5.10-rc2"
    ),
    mono: bool = typer.Option(
        False,
        help = "Whether to use the mono version of Godot or not"
    )
) -> None:
    """Sets an already installed version as the version to use.

    Args:
        version (_type_, optional): _description_. Defaults to typer.Argument( "", help = "The version of Godot to use. Examples: v3.5.1, v4.0-beta, v3.5.10-rc2" ).
        mono (bool, optional): _description_. Defaults to typer.Option( False, help = "Whether to use the mono version of Godot or not" ).
    """

    # make sure the config file exists
    if not assert_config_exists():
        typer.echo("Config file not created. Please run 'gdvm init' first.")
        raise typer.Exit

    # check if the requested version is installed
    if not has_version(version):
        typer.echo(f"Version {version} has not been installed with 'gdvm insatll'. Either you made a typo, you haven't run 'gdvm install', or I am a bad programmer (very possible).")
        raise typer.Exit()


    # TODO: delete the current godot executable

    # TODO: unzip the file to the root of the godot-dir

    # TODO: rename the godot executable


    """
    Quick design choice tangent:
        One may say that instead of this system of downloading zips is inefficient, as the zip could be extracted once during 
        install, and then the user's path environment variable be changed every time 'gdvm' use is run.
        However, I think that having a stable path to godot.exe will benefit most users, since having a constant 
        path to the godot executable will allow for desktop shortcuts to not break every time the path is updated
    - FireSquid6
    """


@app.command(name = "using")
def using() -> None:
    """ 
    Outputs what version of Godot is currently active
    """

@app.command(name = "installed")
def installed() -> None:
    """ 
    Outputs a list of all versions installed and available for use.
    """