import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indian Chess Academy - Professional Chess Training",
  description: "Book → Match → Learn → Improve with India's premier chess academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
