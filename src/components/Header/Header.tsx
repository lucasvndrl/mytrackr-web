"use client";

import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const hideButton = pathname === "/profile";

  const signOutButton = pathname === "/dashboard";

  const handleBack = async () => {
    if (pathname === "/") {
      router.push("/dashboard");
    } else if (pathname.startsWith("/movies/")) {
      router.push(`/dashboard?refresh=${Date.now()}`);
    } else {
      router.back();
    }
  };

  const handleLogout = () => {
    toast.loading("Logging out...", {
      id: "logout-loading",
      duration: 3000,
    });

    router.push("/auth/logout");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <div className="bg-gray-900 text-white py-4 px-6 shadow-md w-full">
      <div className="flex items-center justify-between w-full">
        {signOutButton ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-transparent text-white rounded-md hover:bg-secondary transition"
          >
            ⬅ Sign out
          </button>
        ) : (
          <button
            onClick={handleBack}
            className="text-white hover:text-gray-400 w-10"
            aria-label="Voltar"
          >
            ⬅
          </button>
        )}

        <button
          onClick={() => router.push("/")}
          className="flex-1 text-center bg-transparent border-none text-xl font-bold cursor-pointer"
        >
          🎬 mytrackr
        </button>

        {!hideButton && (
          <button
            onClick={handleProfileClick}
            className="px-4 py-2 bg-transparent text-white rounded-md hover:bg-secondary transition"
          >
            Profile
          </button>
        )}
      </div>
    </div>
  );
}
