import HeaderAuth from "@/components/header-auth";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cykel.club",
  description: "Din platform til Cykelløb, Etaper og Resultatstyring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground">
        <main className=" flex flex-col">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex">
              <div className="w-full px-20 py-6">
                <HeaderAuth />
              </div>
            </nav>
            <div className="flex flex-col gap-20 p-5">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
