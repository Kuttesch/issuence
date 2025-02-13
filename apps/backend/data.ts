import DB from "./database";

enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
enum Status {
  OPEN = "OPEN",
  CURRENT = "CURRENT",
  LATER = "LATER",
  DONE = "DONE",
}
enum Tags {
  BUG = "BUG",
  FEATURE = "FEATURE",
  IMPROVEMENT = "IMPROVEMENT",
}

class Comment {
  public id: number;
  public text: string;
  public created: Date;
  public updated: Date;

  constructor(id: number) {
    this.id = id;
    this.text = "";
    this.created = new Date();
    this.updated = new Date();
  }

  public changeText(text: string) {
    this.text = text;
  }

  public update() {
    this.updated = new Date();
  }
}

class TodoItem {
  public id: number;
  public text: string;
  public done: boolean;

  constructor() {
    this.id = 0;
    this.text = "";
    this.done = false;
  }

  public setStatus(status: boolean) {
    this.done = status;
  }
}

class Issue {
  public db: DB;
  public id: number;
  public title: string;
  public description: string;
  public priority: Priority;
  public status: Status;
  public tags: Tags[];
  public comments: Comment[];
  public todoItems: TodoItem[];
  public created: Date;
  public updated: Date | null;
  public closed: Date | null;

  constructor(db: DB) {
    this.db = db;
    this.id = db.getNewIssueID();
    this.title = "";
    this.description = "";
    this.priority = Priority.LOW;
    this.status = Status.OPEN;
    this.tags = [];
    this.comments = [];
    this.todoItems = [];
    this.created = new Date();
    this.updated = null;
    this.closed = null;
  }

  public async getFromDB(id: number) {
    const issue = await this.db.getIssue(id);
    this.id = issue.id;
    this.title = issue.title;
    this.description = issue.description;
    this.priority = issue.priority;
    this.status = issue.status;
    this.tags = issue.tags;
    this.comments = issue.comments;
    this.todoItems = issue.todoItems;
    this.created = issue.created;
    this.updated = issue.updated;
    this.closed = issue.closed;
  }

  // ## Name
  public changeName(name: string) {
    this.title = name;
  }

  // ## Description
  public changeDescription(description: string) {
    this.description = description;
  }

  // ## Priority
  public changePriority(priority: Priority) {
    this.priority = priority;
  }

  // ## Status
  public changeStatus(status: Status) {
    this.status = status;
  }

  // ## Tags
  public addTag(tag: Tags) {
    this.tags.push(tag);
  }

  public removeTag(tag: Tags) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  // ## Comments
  public addComment(text: string) {
    this.comments.push(new Comment(this.comments.length));
  }

  public removeComment(id: number) {
    this.comments = this.comments.filter((c) => c.id !== id);
    this.comments.forEach((comment, index) => {
      comment.id = index;
    });
  }

  public getComment(id: number) {
    return this.comments.find((c) => c.id === id);
  }

  public addTodoItem(text: string) {
    const todoItem = new TodoItem();
    todoItem.id = this.todoItems.length;
    todoItem.text = text;
    this.todoItems.push(todoItem);
  }

  public removeTodoItem(id: number) {
    this.todoItems = this.todoItems.filter((t) => t.id !== id);
    this.todoItems.forEach((todoItem, index) => {
      todoItem.id = index;
    });
  }

  public getTodoItem(id: number) {
    return this.todoItems.find((t) => t.id === id);
  }

  // ## Dates

  public update() {
    this.updated = new Date();
  }

  public closeIssue() {
    this.status = Status.DONE;
    this.closed = new Date();
  }

  public reopenIssue() {
    this.status = Status.OPEN;
    this.closed = null;
  }

  public saveToDB() {
    this.db.saveIssue(this);
  }
}

export { Issue, Priority, Status, Tags };
