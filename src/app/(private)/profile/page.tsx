import { auth0 } from "@/lib/auth0";
import UpdateProfileForm from "./updateProfileForm";
import { redirect } from "next/navigation";
import { AccountTable } from "@/types/dbTables";

export default async function ProfilePage() {
  const session = await auth0.getSession();
  const user = session?.user;
  const APP_URL = process.env.APP_BASE_URL;
  if (!user) redirect("/sign-in");

  const userResponse = await fetch(`${APP_URL}/api/account/details`, {
    headers: {
      Authorization: `Bearer ${session.tokenSet.accessToken}`,
      sub: session.user.sub,
    },
    cache: "no-store",
  });

  if (!userResponse.ok) {
    redirect("/sign-in");
  }

  const account = (await userResponse.json()) as AccountTable;

  return <UpdateProfileForm user={account} />;
}
