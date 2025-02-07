"""This module contains the logging configuration."""

import logging
import sys

api_logger = logging.getLogger("api")
database_logger = logging.getLogger("database")

class Log():
    """This class configures the logging for the API."""
    def configure_logging(self, ini_data: dict):
        """Configures the logging for the API."""
        simple_formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
        detailed_formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(module)s - %(funcName)s - %(lineno)d - %(message)s")

        stderr_handler = logging.StreamHandler(sys.stderr)
        # if ini_data["logging"]["path"]:
        #     api_path = sys.path[0] + "/" + ini_data["logging"]["path"] + "/api.log"
        #     database_path = sys.path[0] + "/" + ini_data["logging"]["path"] + "/database.log"
        # else:
        api_path = "./logs/api.log"
        database_path = "./logs/database.log"
        # api_file_handler = logging.FileHandler(api_path)
        # database_file_handler = logging.FileHandler(database_path)


        stderr_handler.setFormatter(simple_formatter)
        # api_file_handler.setFormatter(detailed_formatter)
        # database_file_handler.setFormatter(detailed_formatter)

        api_logger.addHandler(stderr_handler)
        # api_logger.addHandler(api_file_handler)

        database_logger.addHandler(stderr_handler)
        # database_logger.addHandler(database_file_handler)


        api_logger.setLevel(self.resolve_level(ini_data))
        database_logger.setLevel(self.resolve_level(ini_data))

    def resolve_level(self, ini_data: dict) -> int:
        """Resolves the logging level."""
        if ini_data["logging"]["level"]:
            level = ini_data["logging"]["level"]
            if level == "DEBUG":
                return logging.DEBUG
            elif level == "INFO":
                return logging.INFO
            elif level == "WARNING":
                return logging.WARNING
            elif level == "ERROR":
                return logging.ERROR
            elif level == "CRITICAL":
                return logging.CRITICAL
            else:
                return logging.DEBUG
        else:
            return logging.DEBUG
