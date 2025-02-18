import { auth0 } from "@/lib/auth0";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello NEXT!",
  description: "A simple Next.js app",
};
export default async function Home() {
  const user = await auth0.getSession();

  return (
    <h1 className="text-gray-500 dark:text-gray-400 font-custom">
      Hello, {user?.user.name}!
    </h1>
  );
}
