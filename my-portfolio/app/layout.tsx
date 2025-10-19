import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Gabriel Corgado | Full-Stack Developer",
  description: "Portfolio of Gabriel Corgado — Full-Stack Engineer specializing in Next.js, React, and Firebase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1E1E1E] flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
