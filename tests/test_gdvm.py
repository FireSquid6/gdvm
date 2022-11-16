""" tests the CLI to ensure everything works properly """

import pytest
from typer.testing import CliRunner
from gdvm import __app_name__, __version__, cli, OS_NAME
from gdvm.godot_downloader import get_download_url


runner = CliRunner()


def test_version():
    result = runner.invoke(cli.app, ["--version"])
    assert result.exit_code == 0
    assert f"{__app_name__} v{__version__}\n" in result.stdout

@pytest.mark.parametrize("input", [
        {
            "expected" : "https://downloads.tuxfamily.org/godotengine/4.0/beta4/Godot_v4.0-beta4_macos.universal.zip",
            "os" : OS_NAME.MAC,
            "version": "4.0",
            "release": "beta4",
            "mono" : False
        }, 
        {
            "expected" : "https://downloads.tuxfamily.org/godotengine/3.5.1/Godot_v3.5.1-stable_win64.exe.zip",
            "os" : OS_NAME.WINDOWS_64,
            "version" : "3.5.1",
            "release" : "stable",
            "mono" : False
        },
        {
            "expected" : "https://downloads.tuxfamily.org/godotengine/3.5.1/mono/Godot_v3.5.1-stable_mono_x11_64.zip",
            "os" : OS_NAME.LINUX_64,
            "version" : "3.5.1",
            "release" : "stable",
            "mono" : True
        },
        {
            "expected" : "https://downloads.tuxfamily.org/godotengine/3.1.2/rc1/Godot_v3.1.2-rc1_win32.exe.zip",
            "os" : OS_NAME.WINDOWS_32,
            "version" : "3.1.2",
            "release" : "rc1",
            "mono" : False,
        },
        {
            "expected" : "https://downloads.tuxfamily.org/godotengine/3.1.2/rc1/mono/Godot_v3.1.2-rc1_mono_x11_32.zip",
            "os" : OS_NAME.LINUX_32,
            "version" : "3.1.2",
            "release" : "rc1",
            "mono" : True,
        },
        {
            "expected" : "https://downloads.tuxfamily.org/godotengine/4.0/beta1/Godot_v4.0-beta1_linux.x86_64.zip",
            "os" : OS_NAME.LINUX_64,
            "version" : "4.0",
            "release" : "beta1",
            "mono" : False,
        },
    ])
def test_url(input):
    result = get_download_url(input["version"], input["os"], input["release"], input["mono"])
    assert (result == input["expected"])