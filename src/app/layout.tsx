import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import ClientProviders from "./ClientProviders";
import ProtectedRoute from '../components/layout/ProtectedRoutes'
import ScrollToTop from "../components/common/ScrollToTop";
import Footer from "../components/layout/Footer";
import { PageFrame } from "../components/ui/page-frame";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  axes: ["opsz"],
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
      <body className={`${inter.variable} antialiased`}>
        <ClientProviders>
          <ProtectedRoute>
          <Navbar />
          <ScrollToTop />
          <PageFrame>
            {children}
            <Footer />
          </PageFrame>
          </ProtectedRoute>
        </ClientProviders>
      </body>
    </html>
  );
}
