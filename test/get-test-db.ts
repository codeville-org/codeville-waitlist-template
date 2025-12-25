import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

export const getTestDB = () => {
  const sqlite = new Database("test.sqlite");

  const db = drizzle(sqlite);

  return db;
};
