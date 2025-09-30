import { db } from "@/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await db
    .selectFrom("account")
    .select("avatar")
    .where("user_id", "=", params.id)
    .executeTakeFirst();

  if (!data?.avatar) {
    return new Response("Not found", { status: 404 });
  }

  const blob = data?.avatar;
  return new Response(blob, {
    headers: { "Content-Type": "image/jpeg" },
  });
}
