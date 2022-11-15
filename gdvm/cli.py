""" provides the CLI """

from typing import Optional
import typer
from gdvm import __app_name__, __version__, OS_NAME, SUCCESS
from gdvm.config import save_os, save_godot_dir, get_os, get_godot_dir, init_config_file
from pathlib import Path


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
        typer.echo(path.absolute())
    except:
        typer.echo("ERROR: The path was not read properly.")
        raise typer.Exit()
    
    save_godot_dir(path)


@app.command(name = "install")
def install(
    version: typer.Argument(
        ...,
        help = "The version of godot to use. 'stable' will get the most recent stable version, while 'latest' will get the newest version. Examples: 1.0, 3.5.2, 4.0"
    ),

    release: typer.Option(
        "stable",
        "-r",
        "--release",
        help = "The specific release of this version. Uses 'stable' by default. Examples: rc1, pre-alpha, beta4, alpha9."
    ),
    mono: typer.Option(
        False,
        "--mono",
        help = "Whether to use the mono version, if it exists."
    ),
    name: typer.Option(
        "",
        "-n"
        "--name",
        help = "A custom name to give this version. If a version with this name already exists, it will be overridden."
    )
) -> None:
    """ 
    Installs a new version of Godot from the tuxfamily repo. It will be saved under the name v{version}-{release}-{mono}, so a version insalled with 'gdvm install 1.0 --stable --mono' could later be accessed by doing 'gdvm use 1.0-stable-mono'
    """
    pass


@app.command(name = "install-custom")
def install_custom(
    name: typer.Argument(
        ...,
        help = "The name you can later use with 'gdvm use' to access this version."
    ),
    zip_file: typer.Argument(
        ...,
        help="The path to a zip file with the godot executable at the root. Can be a url."
    )
) -> None:
    """
    Installs a custom version of Godot either from a url or a local zip file. 
    """


@app.command(name = "use")
def use(
    name: typer.Argument(
        ...,
        "The name of the version to use. Examples: 3.5.2-stable, 4.0-beta4, 3.5-stable-mono."
    )
) -> None:
    """ 
    Switches the current active version of Godot by copying the new executable into the godot folder specified with 'gdvm init'. GODOT MUST BE CLOSED BEFORE DOING THIS!
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


if __name__ == "__main__":
    app()