import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { withTimeout } from "@/utils/with-timeout";

import * as schema from "./schema";

export let db: DrizzleD1Database<typeof schema> | null = null;

export const getDB = () => {
  if (db) {
    return db;
  }

  const { env } = getCloudflareContext();

  if (!env.NEXT_TAG_CACHE_D1) {
    throw new Error("D1 database not found");
  }

  const wrapped = new Proxy(env.NEXT_TAG_CACHE_D1, {
    get(target, prop, receiver) {
      const orig = Reflect.get(target, prop, receiver);
      if (prop === "prepare") {
        return (query: string) => {
          const stmt = orig.call(target, query);
          return new Proxy(stmt, {
            get(stmtTarget, stmtProp, stmtReceiver) {
              const stmtOrig = Reflect.get(stmtTarget, stmtProp, stmtReceiver);
              if (typeof stmtOrig === "function") {
                return async (...args: unknown[]) => {
                  try {
                    return await withTimeout(
                      stmtOrig.apply(stmtTarget, args),
                      2000
                    );
                  } catch (err) {
                    console.error("D1 query error:", err);
                    throw err;
                  }
                };
              }
              return stmtOrig;
            },
          });
        };
      }
      if (typeof orig === "function") {
        return async (...args: unknown[]) => {
          try {
            return await withTimeout(orig.apply(target, args), 2000);
          } catch (err) {
            console.error("D1 query error:", err);
            throw err;
          }
        };
      }
      return orig;
    },
  });

  db = drizzle(wrapped as D1Database, { schema, logger: true });

  return db;
};
