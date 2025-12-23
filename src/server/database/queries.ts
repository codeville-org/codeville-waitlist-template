import type { D1Database } from "@cloudflare/workers-types";

import { getDb } from "./index";
import type { NewSubscriber } from "./schemas";
import * as schema from "./schemas";

export const insertSubscriber = async (
  binding: D1Database,
  newSubscriber: NewSubscriber,
) => {
  const db = getDb(binding);

  const [result] = await db
    .insert(schema.subscribers)
    .values(newSubscriber)
    .returning();

  return result;
};
