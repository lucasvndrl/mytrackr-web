import ToasterClient from "@/components/ToasterClient";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <UserProvider> */}
        <div className="bg-background min-h-screen w-full flex flex-col">
          {/* <Header /> */}
          <main className="flex-1">{children}</main>
          <ToasterClient />
        </div>
        {/* </UserProvider> */}
      </body>
    </html>
  );
}
