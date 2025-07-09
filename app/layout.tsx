import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers"
import { Car} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Rental Admin Dashboard",
  description: "Internal dashboard for managing user-generated listings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-muted sticky top-0 z-[99]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-xl font-semibold text-gray-900">Car Rental Admin Dashboard</h1>
              </div>
              <LogoutButton/>
            </div>
          </div>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
