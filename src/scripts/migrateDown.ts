// scripts/migrateDown.ts
import { FileMigrationProvider, Migrator } from "kysely";
import { readdir as fsReaddir, readFile as fsReadFile } from "node:fs/promises";
import { resolve as pathResolve, join as pathJoin } from "node:path";
import { db } from "../db";
async function main() {
  // Adapters exatamente no formato que o provider tipa
  const fsAdapter = {
    readdir: (p: string) => fsReaddir(p), // => Promise<string[]>
    readFile: (p: string) => fsReadFile(p, "utf8"), // => Promise<string>
  };

  const pathAdapter = {
    resolve: (...parts: string[]) => pathResolve(...parts), // (..args) => string
    join: (...parts: string[]) => pathJoin(...parts), // (..args) => string
  };

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs: fsAdapter as any, // se seu TS ainda reclamar, mantenha esse `as any`
      path: pathAdapter as any, // idem aqui
      migrationFolder: pathResolve(process.cwd(), "src/migrations"),
    }),
  });

  const { error, results } = await migrator.migrateDown();

  for (const r of results ?? []) {
    if (r.status === "Success") console.log(`✅ ${r.migrationName}`);
    else if (r.status === "Error")
      console.error(`❌ ${r.migrationName}`, r.status);
  }

  if (error) {
    console.error("Migration failed", error);
    process.exit(1);
  }

  await db.destroy();
  console.log("✨ Migrations applied");
}

main().catch(async (e) => {
  console.error(e);
  await db.destroy();
  process.exit(1);
});
