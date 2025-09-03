import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await sql`create extension if not exists "pgcrypto"`.execute(db);
  // === account ===
  await db.schema
    .createTable("account")
    .ifNotExists()
    .addColumn("user_id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("username", "varchar(20)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("last_login", "timestamptz", (col) => col.defaultTo(sql`now()`))
    .addColumn("avatar", "bytea")
    .addColumn("favorite_genres", sql`text[]`, (col) =>
      col.notNull().defaultTo(sql`ARRAY[]::text[]`)
    )
    .execute();

  // Uniques úteis
  await db.schema
    .createIndex("account_username_uq")
    .on("account")
    .unique()
    .columns(["username"])
    .execute();
  await db.schema
    .createIndex("account_email_uq")
    .on("account")
    .unique()
    .columns(["email"])
    .execute();

  // === movies ===
  await db.schema
    .createTable("movies")
    .ifNotExists()
    .addColumn("movie_id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("title", "varchar(255)", (col) => col.notNull())
    .addColumn("synopsis", "varchar(250)", (col) => col.notNull())
    .addColumn("directed_by", "varchar(100)", (col) => col.notNull())
    .addColumn("duration", sql`int4`, (col) => col.notNull())
    .addColumn("rating", sql`int4`, (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("movies_title_idx")
    .on("movies")
    .columns(["title"])
    .execute();

  // === reviews ===
  await db.schema
    .createTable("reviews")
    .ifNotExists()
    .addColumn("review_id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("movie_id", "uuid", (col) =>
      col.notNull().references("movies.movie_id").onDelete("cascade")
    )
    .addColumn("review_text", "text", (col) => col.notNull())
    .addColumn("reviewer", "text")
    .addColumn("rating", sql`int4`, (col) => col.notNull())
    .addColumn("review_created", "timestamptz", (col) =>
      col.defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createIndex("reviews_movie_id_idx")
    .on("reviews")
    .columns(["movie_id"])
    .execute();
  await db.schema
    .createIndex("reviews_created_idx")
    .on("reviews")
    .columns(["review_created"])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex("reviews_created_idx").execute();
  await db.schema.dropIndex("reviews_movie_id_idx").execute();
  await db.schema.dropTable("reviews").execute();

  await db.schema.dropIndex("movies_title_idx").execute();
  await db.schema.dropTable("movies").execute();

  await db.schema.dropIndex("account_email_uq").execute();
  await db.schema.dropIndex("account_username_uq").execute();
  await db.schema.dropTable("account").execute();
}
