import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./db/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CF_ACCOUNT_ID!,
    databaseId: process.env.CF_D1_DATABASE_ID!,
    token: process.env.CF_D1_API_TOKEN!,
  },
});
