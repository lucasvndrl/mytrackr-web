"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, getAccessToken } from "@auth0/nextjs-auth0";
import toast from "react-hot-toast";
import { useUserData } from "@/hooks/userData";

export default function CredentialsCheck() {
  const router = useRouter();
  const { setUser } = useUserData();
  const { user, isLoading, error } = useUser();

  useEffect(() => {
    if (isLoading) return;

    if (error || !user) {
      router.push("/sign-in");
      return;
    }

    const validateUser = async () => {
      try {
        const token = await getAccessToken();
        const response = await fetch(`/api/account/details`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.push("/sign-up");
          return;
        }

        const data = await response.json();
        if (!data) {
          router.push("/sign-up");
          return;
        }
        setUser(data);

        toast.success("User validated successfully", { id: "user-validated" });
        router.push("/dashboard");
      } catch (err) {
        console.error("Erro ao validar usuário:", err);
        toast.error("Error validating user", { id: "error-validating-user" });
        router.push("/sign-in");
      }
    };

    validateUser();
  }, [user, isLoading, error, router]);

  return (
    <div className="min-h-screen flex w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-white">Checking credentials...</p>
      </div>
    </div>
  );
}
