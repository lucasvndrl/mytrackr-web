import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("sign-in");
  return (
    <h1 className="text-gray-500 dark:text-gray-400 font-custom">
      Oops, let me redirect you, hold on!
    </h1>
  );
}
