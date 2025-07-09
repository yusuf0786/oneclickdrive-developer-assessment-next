"use client"

import { createContext, useContext, type ReactNode } from "react"
import { toast } from "sonner"

interface NotificationContextType {
  addNotification: (notification: { type: "success" | "error" | "info"; message: string }) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const addNotification = ({ type, message }: { type: "success" | "error" | "info"; message: string }) => {
    switch (type) {
      case "success":
        toast.success(message)
        break
      case "error":
        toast.error(message)
        break
      case "info":
        toast.info(message)
        break
      default:
        toast(message)
    }
  }

  return <NotificationContext.Provider value={{ addNotification }}>{children}</NotificationContext.Provider>
}
