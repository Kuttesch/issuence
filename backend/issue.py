"""This module contains the dataclasses for issues and comments."""
import json
import logging
from dataclasses import dataclass, field


logger = logging.getLogger("api")

@dataclass
class Comment:
    """This class represents a comment."""

    title: str = ""
    description: str = ""
    created: str = ""
    updated: str = ""

    def to_dict(self):
        """Converts the comment to a dictionary."""
        return {
            "title": self.title,
            "description": self.description,
            "created": self.created,
            "updated": self.updated,
        }
    def to_json(self):
        """Converts the comment to a JSON string."""
        return json.dumps(self.to_dict())

@dataclass
class Issue:
    """This class represents an issue."""

    id: int
    title: str
    description: str
    priority: str = ""
    status: str = ""
    tags: list[str] = field(default_factory=list)
    created: str = ""
    updated: str = ""
    closed: bool = False
    comments: list[Comment] = field(default_factory=list)

    def to_dict(self):
        """Converts the issue to a dictionary."""
        return {
            "title": self.title,
            "description": self.description,
            "priority": self.priority,
            "status": self.status,
            "tags": self.tags,
            "created": self.created,
            "updated": self.updated,
            "closed": self.closed,
            "comments": [comment.to_dict() for comment in self.comments],
        }

    def to_json(self):
        """Converts the issue to a JSON string."""
        return json.dumps(self.to_dict())

    def from_data(self, data: dict):
        """Creates an issue from a dictionary."""
        self.title = data["title"]
        self.description = data["description"]
        self.priority = data["priority"]
        self.status = data["status"]
        self.tags = data["tags"]
        self.created = data["created"]
        self.updated = data["updated"]
        self.closed = data["closed"]
        self.comments = [Comment(**comment) for comment in data["comments"]]
