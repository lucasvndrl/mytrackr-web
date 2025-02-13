import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello NEXT!",
  description: "A simple Next.js app",
};
export default function Home() {
  return (
    <h1 className="text-gray-500 dark:text-gray-400 font-custom">
      Hello NEXT!
    </h1>
  );
}
