import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("avatar") as File;
  const userId = formData.get("userId") as string; // ou pegue do token JWT

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  console.log(formData);
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  // Converter file para buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Nome único para o arquivo
  const fileName = `${userId}/avatar-${Date.now()}.jpg`;

  // Upload para o Supabase Storage
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, buffer, {
      contentType: "image/jpeg",
      upsert: true, // Sobrescreve se já existir
    });

  if (error) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  // Pegar URL pública
  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  // Atualizar a coluna avatar na tabela accounts com a URL
  await supabase
    .from("accounts")
    .update({ avatar: urlData.publicUrl })
    .eq("user_id", userId);

  return Response.json({ url: urlData.publicUrl });
}
