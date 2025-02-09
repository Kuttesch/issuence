import pytest
from tinydb import TinyDB, Query
from dataclasses import asdict
from backend.database import Database
from backend.issue import Issue, Comment

# Fixture to initialize the database for testing
@pytest.fixture
def test_db(tmp_path):
    """Fixture to create a temporary database for testing."""
    db_path = tmp_path / "test_db.json"
    database = Database(database_path=str(db_path))
    yield database
    database.db.close()

class TestDatabase:
    """Test class for the Database functionality."""

    def test_database_initialization(self, test_db):
        """Test that the database is initialized correctly."""
        assert isinstance(test_db.db, TinyDB)
        assert test_db.issues_table.name == "issues"
        assert test_db.comments_table.name == "comments"

    def test_insert_and_get_issue(self, test_db):
        """Test inserting an issue and retrieving it by ID."""
        # Create an issue
        issue = Issue(id=1, title="Bug in login page", description="Users cannot log in.")
        test_db.create_issue(asdict(issue))

        # Retrieve the issue
        retrieved_issue = test_db.get_issue(1)
        assert retrieved_issue is not None
        assert retrieved_issue["id"] == 1
        assert retrieved_issue["title"] == "Bug in login page"
        assert retrieved_issue["description"] == "Users cannot log in."

    def test_get_nonexistent_issue(self, test_db):
        """Test retrieving an issue that does not exist."""
        retrieved_issue = test_db.get_issue(999)
        assert retrieved_issue == {"error": "Issue not found"}

    def test_get_issue(self, test_db):
        """Test retrieving an issue by ID."""
        issue = Issue(id=1, title="Bug in login page", description="Users cannot log in.")
        test_db.create_issue(asdict(issue))

        retrieved_issue = test_db.get_issue(1)
        assert retrieved_issue is not None
        assert retrieved_issue["id"] == 1
        assert retrieved_issue["title"] == "Bug in login page"

    def test_get_all_issues(self, test_db):
        """Test retrieving all issues from the database."""
        # Insert multiple issues
        issue1 = Issue(id=1, title="Bug in login page", description="Users cannot log in.")
        issue2 = Issue(id=2, title="Feature request: Dark mode", description="Users want a dark mode option.")
        test_db.create_issue(asdict(issue1))
        test_db.create_issue(asdict(issue2))

        # Retrieve all issues
        all_issues = test_db.get_all_issues()
        assert len(all_issues) == 2
        assert all_issues[0]["title"] == "Bug in login page"
        assert all_issues[1]["title"] == "Feature request: Dark mode"

    def test_add_and_get_comments(self, test_db):
        """Test adding a comment and retrieving comments for an issue."""
        # Create an issue and a comment
        issue = Issue(id=1, title="Bug in login page", description="Users cannot log in.")
        comment = Comment(title="Urgent", description="This is a critical issue.")
        test_db.create_issue(asdict(issue))
        test_db.add_comment(issue.id, comment)

        # Retrieve comments for the issue
        comments = test_db.get_comments_for_issue(1)
        assert len(comments) == 1
        assert comments[0]["title"] == "Urgent"
        assert comments[0]["description"] == "This is a critical issue."
        assert comments[0]["issue_id"] == 1

    def test_update_issue(self, test_db):
        """Test updating an issue in the database."""
        # Create an issue
        issue = Issue(id=1, title="Bug in login page", description="Users cannot log in.")
        test_db.create_issue(asdict(issue))

        # Update the issue
        updated_issue = Issue(id=1, title="Bug in login page", description="Users cannot log in. Fixed!")
        test_db.update_issue(1, updated_issue)

        # Retrieve the updated issue
        retrieved_issue = test_db.get_issue(1)
        assert retrieved_issue is not None
        assert retrieved_issue["description"] == "Users cannot log in. Fixed!"

    def test_delete_issue(self, test_db):
        """Test deleting an issue from the database."""
        # Create an issue
        issue = Issue(id=1, title="Bug in login page", description="Users cannot log in.")
        test_db.create_issue(asdict(issue))

        # Delete the issue
        test_db.delete_issue(1)

        # Verify that the issue is deleted
        retrieved_issue = test_db.get_issue(1)
        assert retrieved_issue == {"error": "Issue not found"}
