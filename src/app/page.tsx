import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

const publicRoutes = [{ path: "/sign-in", whenAuthenticated: "redirect" }];

// HANDLE ROUTING AFTER AUTHENTICATION HERE

export default async function Home() {
  const user = await auth0.getSession();
  const session = await auth0.getSession();
  const authToken = session?.tokenSet.accessToken;

  const isTokenExpired = (expiresAt: number): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > expiresAt;
  };

  if (!authToken) {
    return redirect("/sign-in");
  }

  if (authToken && !isTokenExpired(session?.tokenSet.expiresAt)) {
    return redirect("/dashboard");
  }

  return (
    <h1 className="text-gray-500 dark:text-gray-400 font-custom">
      Hello, {user?.user.name}!
    </h1>
  );
}
