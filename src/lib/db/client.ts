import "server-only";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// ponytail: inline type instead of @cloudflare/workers-types dependency
interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  error?: string;
}
interface D1Database {
  prepare(sql: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(sql: string): Promise<D1Result>;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(col?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

export function getDb(d1Binding: D1Database) {
  return drizzle(d1Binding, { schema });
}
