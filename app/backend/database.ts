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
            // console.log("Creating example data");
            // this.createExampleData();
          }
          resolve();
        }
      });
    });
  }

  public async getAllIssues() {
    return this.issuesCollection.find().map((issue: any) => ({
      id: issue.$loki,
      name: issue.name,
    }));
  }

  public async getIssue(id: number) {
    return this.issuesCollection.findOne({ $loki: id });
  }

  public async saveIssue(issue: any) {
    console.log("Saving issue:", issue);
    if (issue.$loki) {
      this.issuesCollection.update(issue);
    } else {
      this.issuesCollection.insert(issue);
    }
    this.db.saveDatabase();
  }
}
