"use client";

import { ButtonHTMLAttributes, FC } from "react";
import { useRouter } from "next/navigation";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  redirect?: string;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const router = useRouter();
  const handleClick = () => {
    if (props.redirect !== undefined) router.push(props.redirect);
  };
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${props.className || ""}`}
      onClick={props.redirect !== undefined ? handleClick : props.onClick}
    >
      {children}
    </button>
  );
};

export default Button;
