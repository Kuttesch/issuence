import Database from "better-sqlite3";
import type { Issue, Comment, Todo } from "./types";

const db = new Database("issues.db");
db.pragma("foreign_keys = ON");

// --- helper: ensure schema exists ---
function assert_schema() {
  const hasIssues = db
    .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='issues'`)
    .get();
  if (!hasIssues) {
    throw new Error("Database not initialized. Run database_init() first.");
  }
}

// ---------- API (requires schema) ----------

export function get_all_issues(): { id: number; title: string }[] {
  assert_schema();
  return db
    .prepare(`SELECT id, title FROM issues ORDER BY id`)
    .all() as { id: number; title: string }[];
}

export function get_issue(id: number): Issue | null {
  assert_schema();

  const row = db.prepare(`SELECT * FROM issues WHERE id = ?`).get(id) as
    | (Omit<Issue, "comments" | "todos"> & { })
    | undefined;

  if (!row) return null;

  const comments = db
    .prepare(`SELECT text, created FROM comments WHERE issue_id = ? ORDER BY id`)
    .all(id) as Comment[];

  const todos = (db
    .prepare(`SELECT text, done FROM todos WHERE issue_id = ? ORDER BY id`)
    .all(id) as { text: string; done: 0 | 1 }[]).map<Todo>((t) => ({
    text: t.text,
    done: !!t.done,
  }));

  return {
    ...row,
    comments,
    todos,
  };
}

/**
 * Save or update an issue.
 * - If issue.id == 0 → insert new issue and assign ID
 * - If issue.id exists → update existing
 */
export function save_issue(issue: Issue): Issue {
  assert_schema();
  const now = new Date().toISOString();
  let finalId = issue.id;
  let createdForReturn = issue.created;

  const trx = db.transaction(() => {
    if (!issue.id || issue.id === 0) {
      // New issue → let SQLite assign ID
      const info = db
        .prepare(
          `INSERT INTO issues (title, description, priority, status, created, updated)
           VALUES (?, ?, ?, ?, ?, ?)`
        )
        .run(
          issue.title,
          issue.description,
          issue.priority,
          issue.status,
          now,
          null
        );
      finalId = Number(info.lastInsertRowid);
      createdForReturn = now;
    } else {
      // Existing issue
      const existing = db
        .prepare(`SELECT * FROM issues WHERE id = ?`)
        .get(issue.id) as Issue | undefined;
      if (!existing) throw new Error(`Issue with id=${issue.id} does not exist.`);

      const updated =
        issue.title !== existing.title || issue.description !== existing.description
          ? now
          : existing.updated;

      db.prepare(
        `UPDATE issues
         SET title = ?, description = ?, priority = ?, status = ?, updated = ?
         WHERE id = ?`
      ).run(
        issue.title,
        issue.description,
        issue.priority,
        issue.status,
        updated,
        issue.id
      );

      db.prepare(`DELETE FROM comments WHERE issue_id = ?`).run(issue.id);
      db.prepare(`DELETE FROM todos WHERE issue_id = ?`).run(issue.id);

      createdForReturn = existing.created;
    }

    // Insert comments
    const insertComment = db.prepare(
      `INSERT INTO comments (issue_id, text, created) VALUES (?, ?, ?)`
    );
    for (const c of issue.comments) {
      insertComment.run(finalId, c.text, c.created);
    }

    // Insert todos
    const insertTodo = db.prepare(
      `INSERT INTO todos (issue_id, text, done) VALUES (?, ?, ?)`
    );
    for (const t of issue.todos) {
      insertTodo.run(finalId, t.text, t.done ? 1 : 0);
    }
  });

  trx();

  return { ...issue, id: finalId, created: createdForReturn };
}

export function delete_issue(id: number): void {
  assert_schema();
  db.prepare(`DELETE FROM issues WHERE id = ?`).run(id);
}

// ---------- Init (creates schema + example issue) ----------

export function database_init(): void {
  db.exec(`
  CREATE TABLE IF NOT EXISTS issues (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT NOT NULL,
    created TEXT NOT NULL,
    updated TEXT
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY,
    issue_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created TEXT NOT NULL,
    FOREIGN KEY(issue_id) REFERENCES issues(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY,
    issue_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    done INTEGER NOT NULL,
    FOREIGN KEY(issue_id) REFERENCES issues(id) ON DELETE CASCADE
  );
  `);

  const now = new Date().toISOString();
  const example: Issue = {
    id: 0, // let DB assign
    title: "Example Issue",
    description: "This is an example issue created during initialization.",
    priority: "med",
    status: "open",
    created: now,
    updated: null,
    comments: [
      { text: "First comment", created: now },
      { text: "Second comment", created: now },
    ],
    todos: [
      { text: "Try editing this issue", done: false },
      { text: "Add a new issue", done: false },
    ],
  };

  save_issue(example);
}

if (require.main === module) {
  if (process.argv.includes("--init")) {
    database_init();
    console.log("Database initialized with example issue.");
  } else {
    console.log("Usage: ts-node src/backend/db/database.ts --init");
  }
}
