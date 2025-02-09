import { contextBridge, ipcRenderer } from "electron";
import { Issue } from "./data";
import { Low as LowDB } from "lowdb";
import { JSONFile} from "lowdb/node";


export default class DB {
    private db: LowDB<any>;
    private adapter: JSONFile<any>;

    constructor(file: string = "database.json") {
        this.adapter = new JSONFile(file);
        this.db = new LowDB(this.adapter, {});
        this.db.data = { issues: [] };
    }

    private async readDB() {
        await this.db.read();
    }

    public async getIssue(id: number) {
        return this.db.data.issues.find((issue: Issue) => issue.id === id);
    }

    public getNumberOfIssues() {
        return this.db.data.issues.length;
    }

    public getNameOfIssue(id: number) {
        return this.db.data.issues.find((issue: Issue) => issue.id === id).title;
    }

    public async addIssue(issue: Issue) {
        this.db.data.issues.push(issue);
        await this.db.write();
    }

    public async saveIssue(issue: Issue) {
        const index = this.db.data.issues.findIndex((i: Issue) => i.id === issue.id);
        if (index === -1) {
            this.db.data.issues.push(issue);
        } else {
            this.db.data.issues[index] = issue;
        }
        await this.db.write();
    }

    public removeIssue(id: number) {
        this.db.data.issues = this.db.data.issues.filter((issue: Issue) => issue.id !== id);
        this.db.data.issues.forEach((issue: Issue, index: number) => {
            issue.id = index + 1;
        });
        this.db.write();
    }

    public getNewIssueID() {
        return this.db.data.issues.length + 1;
    }
}
