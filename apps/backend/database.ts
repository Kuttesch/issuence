import { Issue, Priority, Status } from "./data";
import loki from "lokijs";

console.log("Hello from database.ts");

export default class DB {
  private db: loki;
  private issuesCollection: any;

  constructor(file: string = "database.json") {
    this.db = new loki(file, { persistenceMethod: "fs" }); // Use file system for persistence
  }

  public async initDB() {
    return new Promise<void>((resolve, reject) => {
      this.db.loadDatabase({}, (err) => {
        if (err) {
          console.error("Failed to load database:", err);
          reject(err);
        } else {
          console.log("Database loaded successfully");
          this.issuesCollection = this.db.getCollection("issues");
          if (!this.issuesCollection) {
            console.log("Creating issues collection");
            this.issuesCollection = this.db.addCollection("issues");
          }
          if (this.issuesCollection.count() === 0) {
            console.log("Creating example data");
            this.createExampleData();
          }
          resolve();
        }
      });
    });
  }

  public async getIssue(id: number) {
    const issue = this.issuesCollection.findOne({ id });
    return issue;
  }

  public async getNumberOfIssues() {
    return this.issuesCollection.count();
  }

  public async getNameOfIssue(id: number) {
    const issue = this.issuesCollection.findOne({ id });
    return issue?.title;
  }

  public async getIdOfIssue(name: string) {
    const issue = this.issuesCollection.findOne({ title: name });
    return issue?.id;
  }

  public async getListOfAllIssueNames() {
    console.log("Getting list of all issue names");
    const issues = this.issuesCollection.find();
    return issues.map((issue: Issue) => issue.title);
  }

  public async addIssue(issue: Issue) {
    // Lokidb automatically generates unique IDs unless you specify one
    this.issuesCollection.insert(issue);
    this.db.saveDatabase(); // Save to disk
  }

  public async saveIssue(issue: Issue) {
    const existingIssue = this.issuesCollection.findOne({ id: issue.id });
    if (existingIssue) {
      this.issuesCollection.update(issue);
    } else {
      this.issuesCollection.insert(issue);
    }
    this.db.saveDatabase(); // Save to disk
  }

  public async removeIssue(id: number) {
    const issue = this.issuesCollection.findOne({ id });
    if (issue) {
      this.issuesCollection.remove(issue);
    }
  }

  public getNewIssueID() {
    return this.issuesCollection.count() + 1;
  }

  public async saveDatabase() {
    this.db.saveDatabase();
    console.log("Database saved");
    return;
  }

  public async createExampleData() {
    console.log("Creating example data");
    this.db.removeCollection("issues");
    this.issuesCollection = this.db.addCollection("issues");
    const exampleData = [
      {
        id: 1,
        title: "Example Issue",
        description: "This is an example issue",
        priority: Priority.LOW,
        status: Status.OPEN,
        tags: ["example", "issue"],
        comments: [
          {
            id: 1,
            text: "This is a comment",
            created: new Date("2024-12-01T10:30:00Z"),
          },
        ],
        todoItems: [
          {
            id: 1,
            text: "This is a todo item",
            done: true,
          },
          {
            id: 2,
            text: "This is another todo item",
            done: false,
          },
        ],
        created: new Date("2024-12-01T09:00:00Z"),
        updated: new Date("2024-12-02T15:45:00Z"),
        closed: null,
      },
      {
        id: 2,
        title: "Another Example Issue",
        description: "## This is another example issue",
        priority: Priority.MEDIUM,
        status: Status.CURRENT,
        tags: ["example", "issue"],
        comments: [
          {
            id: 1,
            text: "This is a comment",
            created: new Date("2024-12-05T14:20:00Z"),
          },
        ],
        todoItems: [
          {
            id: 1,
            text: "This is a todo item",
            done: true,
          },
          {
            id: 2,
            text: "This is another todo item",
            done: false,
          },
        ],
        created: new Date("2024-12-05T12:00:00Z"),
        updated: null,
        closed: null,
      },
      {
        id: 3,
        title: "Yet Another Example Issue",
        description: "### This is yet another example issue",
        priority: Priority.HIGH,
        status: Status.LATER,
        tags: ["example", "issue"],
        comments: [
          {
            id: 1,
            text: "This is a comment",
            created: new Date("2024-11-20T08:45:00Z"),
            updated: new Date("2024-11-21T10:00:00Z"),
          },
        ],
        todoItems: [
          {
            id: 1,
            text: "This is a todo item",
            done: false,
          },
          {
            id: 2,
            text: "This is another todo item",
            done: true,
          },
        ],
        created: new Date("2024-11-15T07:30:00Z"),
        updated: new Date("2024-11-22T16:30:00Z"),
        closed: new Date("2024-11-23T09:15:00Z"),
      },
      {
        id: 4,
        title: "One More Example Issue",
        description: "This is one more example issue",
        priority: Priority.LOW,
        status: Status.OPEN,
        tags: ["example", "issue"],
        comments: [
          {
            id: 1,
            text: "This is a comment",
            created: new Date("2025-01-02T11:20:00Z"),
          },
        ],
        todoItems: [
          {
            id: 1,
            text: "This is a todo item",
            done: false,
          },
          {
            id: 2,
            text: "This is another todo item",
            done: false,
          },
        ],
        created: new Date("2025-01-01T10:00:00Z"),
        updated: new Date("2025-02-10T14:50:00Z"),
        closed: null,
      },
    ];

    this.issuesCollection.insert(exampleData);
    this.db.saveDatabase(); // Save to disk
  }
}
