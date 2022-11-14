"""Top level package. Contains constants and whatnot."""


from enum import Enum


__app_name__ = "gdvm"
__version__ = "0.1.0"

class OS_NAME(Enum):
    WINDOWS_64 = "win64.exe.zip"
    WINDOWS_32 = "win32.exe.zip"
    MAC = "macos.universal.zip"
    LINUX_64 = "linux.x86_64.zip"
    LINUX_32 = "linux.x86_32"



(
    SUCCESS,
    DIR_ERROR,
    FILE_ERROR,
    DB_READ_ERROR,
    DB_WRITE_ERROR,
    JSON_ERROR,
    ID_ERROR,
) = range(7)

ERRORS = {
    DIR_ERROR: "config directory error",
    FILE_ERROR: "config file error",
    DB_READ_ERROR: "database read error",
    DB_WRITE_ERROR: "database write error",
    ID_ERROR: "to-do id error",
}

