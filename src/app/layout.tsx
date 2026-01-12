import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import ClientProviders from "./ClientProviders";
import ProtectedRoute from '../components/layout/ProtectedRoutes'
import ScrollToTop from "../components/common/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IntelliBlog",
  description: "AI Blog Application",
  icons: { icon: "/book-open.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>
          <ProtectedRoute>
          <Navbar />
          <ScrollToTop />
          {children}
          </ProtectedRoute>
        </ClientProviders>
      </body>
    </html>
  );
}
