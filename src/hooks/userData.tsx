"use client";

import { AccountTable } from "@/types/dbTables";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserContextProps {
  user: AccountTable | null;
  setUser: React.Dispatch<React.SetStateAction<AccountTable | null>>;
  updateUserData: (token: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
  updateUserData: async () => {},
});

export const useUserData = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AccountTable | null>(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = await getAccessToken();
  //     if (token) {
  //       await updateUserData(token);
  //     } else {
  //       toast.error("Failed to refresh user");
  //       redirect("/sign-in");
  //     }
  //   };
  //   if (!user) {
  //     fetchUserData();
  //   }
  // }, [user]);

  const updateUserData = async (token: string) => {
    const response = await fetch("/api/account/details", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
      toast.success("User refreshed");
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}
