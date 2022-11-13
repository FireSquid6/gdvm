""" provides the CLI """

from typing import Optional
import typer
from gdvm import __app_name__, __version__

app = typer.Typer()


"""
COMMANDS
"""
def _version_callback():
    typer.echo(f"{__app_name__} v{__version__}")
    raise typer.Exit()

@app.callback()
def main(
    version: Optional[bool] = typer.Option(
        None,
        "--version",
        "-v",
        help=  "Shows gdvm's version",
        callback = _version_callback, 
    )
) -> None:
    return




if __name__ == "__main__":
    app()