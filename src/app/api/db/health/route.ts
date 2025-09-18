import { db } from "@/db";
import { sql } from "kysely";

export async function GET() {
  try {
    const result = await sql<string>`SELECT NOW() as now`.execute(db);
    return Response.json(
      {
        ok: true,
        message: "Conexão com o banco funcionando ✅",
        result,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("❌ Erro de conexão com Supabase:", e);

    return Response.json(
      {
        ok: false,
        message: "Falha ao conectar no banco ❌",
        error: e.message ?? String(e),
      },
      { status: 500 }
    );
  }
}
