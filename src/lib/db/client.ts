import "server-only";
import * as schema from "./schema";

// Two paths depending on runtime environment:

// 1. Cloudflare Workers / Pages runtime — uses the binding directly
//    import { drizzle } from "drizzle-orm/d1";
//    export function getDb(d1Binding: D1Database) { return drizzle(d1Binding, { schema }); }

// 2. Vercel / any Node.js runtime — uses D1 REST API via HTTP
//    Drizzle ORM doesn't expose a d1-http driver in v0.45.2.
//    Use lib/db.ts's executeQuery() for HTTP-based D1 access.
//    When a D1 HTTP driver becomes available in drizzle-orm, this becomes:
//      import { drizzle } from "drizzle-orm/d1-http";
//      export function getDb() { return drizzle({ accountId, databaseId, token }, { schema }); }

export { schema };
