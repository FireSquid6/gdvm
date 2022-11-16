"""Top level package. Contains constants and whatnot."""


from enum import Enum


__app_name__ = "gdvm"
__version__ = "0.1.0"
__godot_repo__ = "https://downloads.tuxfamily.org/godotengine"

class OS_NAME():
    WINDOWS_64 = "win64.exe.zip"
    WINDOWS_32 = "win32.exe.zip"
    MAC = "macos.universal.zip"
    LINUX_64 = "x11.64.zip"
    LINUX_32 = "x11.32.zip"
    LINUX_HEADLESS = "linux_headless.64.zip"
    LINUX_SERVER = "linux_server.64.zip"


(
    SUCCESS,
    DIR_ERROR,
    FILE_ERROR,
    DB_READ_ERROR,
    DB_WRITE_ERROR,
    TOML_ERROR,
    ID_ERROR,
    URL_ERROR,
    UNZIP_ERROR,
) = range(9)

ERRORS = {
    DIR_ERROR: "config directory error",
    FILE_ERROR: "config file error",
    DB_READ_ERROR: "database read error",
    DB_WRITE_ERROR: "database write error",
    ID_ERROR: "to-do id error",
}

