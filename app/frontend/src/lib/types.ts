export type Comment = {
  text: string;
  created: string;
};

export type Todo = {
  text: string;
  done: boolean;
};

export type Issue = {
  id: number;
  title: string;
  description: string;
  priority: "low" | "med" | "high";
  status: "open" | "now" | "later" | "done";
  // tags: string[]; #Not yet to implement
  comments: Comment[];
  todos: Todo[];
  created: string;
  updated: string | null;
};