import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "FundFlow — Fund Your Creative Journey",
  description: "The modern crowdfunding platform for developers, designers, and creators. Get direct support from your community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
