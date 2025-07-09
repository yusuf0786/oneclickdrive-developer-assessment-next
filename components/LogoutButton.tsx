"use client";

import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = () => {
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        router.push("/login")
    }

    return (
        <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
        </Button>
    )
}

export default LogoutButton;