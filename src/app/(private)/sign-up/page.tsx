"use client";
import toast from "react-hot-toast";
import RegisterForm from "./registerForm";
import { useEffect } from "react";

export default function SignUp() {
  const notify = (message: string, hasError: boolean) => {
    "use client";
    toast(message, {
      position: "top-center",
      style: {
        background: hasError ? "#ff0000" : "#00ff00",
        color: "#000000",
      },
      id: "register-notification",
    });
  };

  useEffect(() => {
    notify("Register your account first", true);
  }, []);
  return <RegisterForm />;
}
