import ToasterClient from "@/components/ToasterClient";
import { UserProvider } from "@/hooks/userData";
import Header from "@/components/Header/Header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="bg-background min-h-screen w-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <ToasterClient />
      </div>
    </UserProvider>
  );
}
