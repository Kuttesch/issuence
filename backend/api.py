"""This module contains the API between the frontend and the backend."""

import json
import logging

from backend.database import Database
from backend.issue import Issue, Comment

logger = logging.getLogger("api")

class API:
    """This class defines the API between the frontend and the backend.
    """

    def __init__(self):
        """Initializes the API.
        """
        self.database = Database()

    def init_program(self):
        """Initializes the program."""
        all_issues = []
        all_issue_names = []
        issue_count = self.database.get_issue_count()
        for each in range(1, issue_count):
            issue_name = self.get_issue_name(each)
            all_issues.append({"id": each, "name": issue_name})
        
        # Sort by 'id' in ascending order
        sorted_issues = sorted(all_issues, key=lambda x: x["id"])
        
        for id, issue in enumerate(sorted_issues):
            all_issue_names.append(issue["name"])

        logger.info(all_issue_names)
        return all_issue_names


    def get_issue_name(self, id: int):
        """Gets the name of an issue.
        """
        issue = self.database.get_issue(id)
        logger.info(issue)
        return str(issue["title"])

    def create_issue(self, issue: dict):
        """Creates an issue.
        """
        self.database.create_issue(issue)

    def update_issue(self, issue: dict):
        """Updates an issue.
        """
        pass

    def load_issue(self, issue_id: int):
        """Loads an issue.
        """
        pass

    def test(self):
        """Tests the API.
        """
        return 0