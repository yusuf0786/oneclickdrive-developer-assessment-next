"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/context/AuthContext"
import { NotificationProvider } from "@/context/NotificationContext"
import { Toaster } from "@/components/ui/sonner"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        {children}
        <Toaster />
      </NotificationProvider>
    </AuthProvider>
  )
}
