import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types/dbTables";

// it is possible to run migrations using kysely, doc: https://kysely.dev/docs/migrations

const postgresDialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.NODE_ENV === "test" ? "testdb" : "postgres",
    host: "localhost",
    user: process.env.NODE_ENV === "test" ? "test" : "postgres",
    password: process.env.NODE_ENV === "test" ? "test" : "1234",
    port: 5432,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect: postgresDialect,
});
