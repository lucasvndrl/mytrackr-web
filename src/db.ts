import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import { Database } from "./types/dbTables";

const connectionString =
  (process.env.DATABASE_URL_MIGRATE
    ? process.env.DATABASE_URL_MIGRATE
    : process.env.DATABASE_URL) ??
  "postgresql://postgres:1234@localhost:5432/postgres";
console.log(connectionString);
const pool = new pg.Pool({
  connectionString,
  ssl: connectionString.includes("supabase.co")
    ? {
        rejectUnauthorized: false,
        checkServerIdentity: () => undefined, // Desabilita verificação do servidor
      }
    : undefined,
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});
