"""
This module creates a webview window with a specified API.
"""

import webview
import logging
import inifile
from backend.api import API
from backend.log import Log

logging.getLogger("webview")

def main():
    """This function creates a webview window with a specified API."""
    ini_data = get_ini_data("config.ini")
    log = Log()
    log.configure_logging(ini_data)

    api = API()
    window = webview.create_window(
        "Window",
        "http://localhost:5173",
        min_size=(500, 500),
        js_api=api,
    )
    webview.start(debug=True)

def get_ini_data(path: str) -> dict:
    """This function reads the ini data from a file."""
    ini = inifile.IniFile("config.ini")
    ini.read(path)
    return ini.to_dict()


if __name__ == "__main__":
    main()