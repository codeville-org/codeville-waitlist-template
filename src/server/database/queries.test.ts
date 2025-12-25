import { it, expect, mock, beforeEach } from "bun:test";
import { insertSubscriber } from "./queries";

import type { D1Database } from "@cloudflare/workers-types";
import type { NewSubscriber } from "./schemas";
import { getTestDB } from "test/get-test-db";

mock.module("./index.ts", () => {
  return {
    getDb: () => getTestDB(),
  };
});

it("insert a new subscriber into the database", async () => {
  const newSubscriber: NewSubscriber = {
    email: "test@test.com",
  };

  const result = await insertSubscriber({} as D1Database, newSubscriber);

  // Test Case Expectations
  expect(result.email).toBe(newSubscriber.email);
  expect(result.id).toBeDefined();
  expect(result.createdAt).toBeDefined();
});

it("throws an error when inserting a duplicate email", async () => {
  const newSubscriber: NewSubscriber = {
    email: "test@test.com",
  };

  expect(insertSubscriber({} as D1Database, newSubscriber)).rejects.toThrow();
});

it("throws an error when trying to insert invalid email", async () => {
  const newSubscriber: NewSubscriber = {
    email: "test123",
  };

  expect(insertSubscriber({} as D1Database, newSubscriber)).rejects.toThrow();
});
