import "./globals.css";
import { Auth0Provider } from "@auth0/nextjs-auth0";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-background min-h-screen w-full flex">{children}</div>
      </body>
    </html>
  );
}
