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
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className=" flex flex-col">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-center items-center p-3 px-5 text-sm">
                <HeaderAuth />
              </div>
            </nav>
            <div className="flex flex-col gap-20 max-w-5xl p-5">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
