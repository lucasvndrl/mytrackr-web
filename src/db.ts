import { Kysely, PostgresDialect } from "kysely";
import pg, { Pool } from "pg";
import { Database } from "./types/dbTables";

const connectionString =
  (process.env.DATABASE_URL_MIGRATE
    ? process.env.DATABASE_URL_MIGRATE
    : process.env.DATABASE_URL) ??
  "postgresql://postgres:1234@localhost:5432/postgres";
console.log(connectionString);
const pool = new Pool({
  host: process.env.DATABASE_HOST!,
  port: parseInt(process.env.DATABASE_PORT!),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  max: 3,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 5_000,
  ssl: {
    rejectUnauthorized: false,
    checkServerIdentity: () => undefined,
  },
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});
