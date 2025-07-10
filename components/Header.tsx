"use client";
import { Car, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"

export default function Header() {
    const router = useRouter()

    const handleLogout = () => {
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        router.push("/login")
    }

    return (
        <header className="bg-white shadow-sm border-b border-muted sticky top-0 z-[99]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                <Car className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-sm md:text-xl font-semibold text-gray-900">Car Rental Admin Dashboard</h1>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </div>
            </div>
        </header>
    );
}