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

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
    this.created = new Date();
  }

  public toJSON() {
    return {
      id: this.id,
      text: this.text,
      created: this.created,
    };
  }
}

class TodoItem {
  public id: number;
  public text: string;
  public done: boolean;

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
    this.done = false;
  }

  public setStatus(status: boolean) {
    this.done = status;
  }
}

class Issue {
  public id: number | null;
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

  constructor() {
    this.id = null;
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
    this.comments.push(new Comment(this.comments.length, text));
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
}

export { Issue, Comment, TodoItem, Priority, Status, Tags };
