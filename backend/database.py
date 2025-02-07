import webview
from typing import Optional, List, Union
from tinydb import TinyDB, Query
from tinydb.database import Document
from dataclasses import asdict
from backend.issue import Issue, Comment

class Database:
    """This class represents the database."""

    def __init__(self, database_path: str = "database.json"):
        """Initializes the database."""
        self.database_path = database_path
        self.db = TinyDB(database_path)  # Initialize TinyDB
        self.issues_table = self.db.table("issues")  # Create a table for issues
        self.comments_table = self.db.table("comments")  # Create a table for comments
        self.IssueQuery = Query()  # Define IssueQuery

    def create_issue(self, data: dict):
        """Inserts a dictionary into the database."""
        self.issues_table.insert(data)

    def get_issue(self, issue_id):
        """Returns an issue from the database."""
        result = self.issues_table.get(self.IssueQuery.id == issue_id)
        if result is None:
            return {"error": "Issue not found"}
        return result

    def get_all_issues(self) -> List[dict]:
        """Returns all issues from the database."""
        results = self.issues_table.all()
        return [dict(result) for result in results]  # Convert Documents to dicts

    def add_comment(self, issue_id: int, comment: Comment):
        """Adds a comment to an issue."""
        comment_data = asdict(comment)
        comment_data["issue_id"] = issue_id  # Link the comment to the issue
        self.comments_table.insert(comment_data)

    def get_comments_for_issue(self, issue_id: int) -> List[dict]:
        """Returns all comments for a specific issue."""
        CommentQuery = Query()
        results = self.comments_table.search(CommentQuery.issue_id == issue_id)
        return [dict(result) for result in results]  # Convert Documents to dicts

    def update_issue(self, issue_id: int, issue: Issue):
        """Updates an issue in the database."""
        self.issues_table.update(asdict(issue), doc_ids=[issue_id])

    def delete_issue(self, issue_id: int):
        """Deletes an issue from the database."""
        self.issues_table.remove(doc_ids=[issue_id])

    def get_issue_count(self) -> int:
        """Returns the number of issues in the database."""
        if self.issues_table:
            return len(self.issues_table)
        return 0