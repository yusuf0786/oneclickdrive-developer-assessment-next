export interface CarListing {
  id: string
  title: string
  description: string
  make: string
  model: string
  year: number
  pricePerDay: number
  location: string
  imageUrl: string
  status: "pending" | "approved" | "rejected"
  submittedBy: string
  submittedAt: string
  lastModified: string
  modifiedBy?: string
}

export interface User {
  id: string
  username: string
  role: "admin"
}

export interface AuditLog {
  id: string
  listingId: string
  action: "approve" | "reject" | "edit"
  performedBy: string
  timestamp: string
  details?: string
}

export interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}
