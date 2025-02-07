"""
This module creates a webview window with a specified API.
"""

import webview
import logging
import configparser
from backend.api import API
from backend.log import Log

logger = logging.getLogger("api")

def main():
    """This function creates a webview window with a specified API."""
    ini_data = get_ini_data("config.ini")
    log = Log()
    log.configure_logging(ini_data)

    api = API()
    if api.test() == 0:
        logger.info("API test passed.")
    else:
        logger.error("API test failed.")
    window = webview.create_window(
        "Window",
        "http://localhost:5173",
        min_size=(500, 500),
        js_api=api,
    )
    webview.start(debug=True)

def get_ini_data(path: str) -> dict:
    """This function reads the INI data from a file."""
    config = configparser.ConfigParser()
    config.read(path)
    return {section: dict(config[section]) for section in config.sections()}


if __name__ == "__main__":
    main()