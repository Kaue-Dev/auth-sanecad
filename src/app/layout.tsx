import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanecad",
  description: "Sanecad",
}

type RootLayoutProps = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-zinc-950 antialiased">
        {children}
      </body>
    </html>
  );
}
