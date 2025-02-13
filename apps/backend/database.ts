import { Issue } from "./data";
import loki from "lokijs";

console.log("Hello from database.ts");

export default class DB {
  private db: loki;
  private issuesCollection: any;

  constructor(file: string = "database.json") {
    this.db = new loki(file, { persistenceMethod: "fs" }); // Use file system for persistence
    // this.issuesCollection = this.db.addCollection("issues"); // Create or access issues collection
  }

  public async initDB() {
    return new Promise<void>((resolve, reject) => {
      this.db.loadDatabase({}, () => {
        console.log("Database loaded");

        this.issuesCollection = this.db.getCollection("issues");
        if (!this.issuesCollection) {
          this.issuesCollection = this.db.addCollection("issues");
          this.createExampleData();
          console.log("Database initialized with example data");
        }

        this.db.saveDatabase(); // Save changes
        resolve();
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

    // Reassign IDs to maintain order
    const allIssues = this.issuesCollection.find();
    allIssues.forEach((issue: Issue, index: number) => {
      issue.id = index + 1;
      this.issuesCollection.update(issue);
    });

    this.db.saveDatabase(); // Save to disk
  }

  public getNewIssueID() {
    return this.issuesCollection.count() + 1;
  }

  public async createExampleData() {
    const exampleData = [
      {
        id: 1,
        title: "Example Issue",
        description: "This is an example issue",
        priority: "low",
        status: "open",
        tags: ["example", "issue"],
        comments: [
          {
            id: 1,
            text: "This is a comment",
            created: new Date(),
          },
        ],
        created: new Date(),
        updated: null,
        closed: null,
      },
      {
        id: 2,
        title: "Another Example Issue",
        description: "This is another example issue",
        priority: "high",
        status: "open",
        tags: ["example", "issue"],
        comments: [
          {
            id: 1,
            text: "This is a comment",
            created: new Date(),
          },
        ],
        created: new Date(),
        updated: null,
        closed: null,
      },
    ];

    this.issuesCollection.insert(exampleData);
    this.db.saveDatabase(); // Save to disk
  }
}
