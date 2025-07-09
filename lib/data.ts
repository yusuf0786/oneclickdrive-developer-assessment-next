import type { CarListing, AuditLog } from "./types"

// Mock data storage (in production, this would be a database)
export const listings: CarListing[] = [
  {
    id: "1",
    title: "2022 Tesla Model 3 - Premium Electric",
    description: "Luxury electric vehicle with autopilot features, perfect for city driving.",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    pricePerDay: 89,
    location: "San Francisco, CA",
    imageUrl: "/placeholder.svg?height=200&width=300",
    status: "pending",
    submittedBy: "john.doe@email.com",
    submittedAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "2021 BMW X5 - Luxury SUV",
    description: "Spacious luxury SUV perfect for family trips and business travel.",
    make: "BMW",
    model: "X5",
    year: 2021,
    pricePerDay: 125,
    location: "Los Angeles, CA",
    imageUrl: "/placeholder.svg?height=200&width=300",
    status: "approved",
    submittedBy: "jane.smith@email.com",
    submittedAt: "2024-01-14T14:20:00Z",
    lastModified: "2024-01-14T16:45:00Z",
    modifiedBy: "admin",
  },
  {
    id: "3",
    title: "2020 Honda Civic - Reliable Compact",
    description: "Fuel-efficient compact car, great for daily commuting and short trips.",
    make: "Honda",
    model: "Civic",
    year: 2020,
    pricePerDay: 45,
    location: "New York, NY",
    imageUrl: "/placeholder.svg?height=200&width=300",
    status: "rejected",
    submittedBy: "mike.wilson@email.com",
    submittedAt: "2024-01-13T09:15:00Z",
    lastModified: "2024-01-13T11:30:00Z",
    modifiedBy: "admin",
  },
  {
    id: "4",
    title: "2023 Ford Mustang - Sports Car",
    description: "High-performance sports car for those who love speed and style.",
    make: "Ford",
    model: "Mustang",
    year: 2023,
    pricePerDay: 95,
    location: "Miami, FL",
    imageUrl: "/placeholder.svg?height=200&width=300",
    status: "pending",
    submittedBy: "sarah.johnson@email.com",
    submittedAt: "2024-01-16T08:45:00Z",
    lastModified: "2024-01-16T08:45:00Z",
  },
  {
    id: "5",
    title: "2022 Jeep Wrangler - Off-Road Adventure",
    description: "Rugged off-road vehicle perfect for outdoor adventures and camping trips.",
    make: "Jeep",
    model: "Wrangler",
    year: 2022,
    pricePerDay: 75,
    location: "Denver, CO",
    imageUrl: "/placeholder.svg?height=200&width=300",
    status: "approved",
    submittedBy: "tom.brown@email.com",
    submittedAt: "2024-01-12T16:20:00Z",
    lastModified: "2024-01-12T17:10:00Z",
    modifiedBy: "admin",
  },
]

export const auditLogs: AuditLog[] = [
  {
    id: "1",
    listingId: "2",
    action: "approve",
    performedBy: "admin",
    timestamp: "2024-01-14T16:45:00Z",
    details: "Listing approved after verification",
  },
  {
    id: "2",
    listingId: "3",
    action: "reject",
    performedBy: "admin",
    timestamp: "2024-01-13T11:30:00Z",
    details: "Rejected due to incomplete documentation",
  },
]

export const updateListing = (id: string, updates: Partial<CarListing>) => {
  const index = listings.findIndex((listing) => listing.id === id)
  if (index !== -1) {
    listings[index] = { ...listings[index], ...updates, lastModified: new Date().toISOString() }
    return listings[index]
  }
  return null
}

export const addAuditLog = (log: Omit<AuditLog, "id">) => {
  const newLog = { ...log, id: Date.now().toString() }
  auditLogs.push(newLog)
  return newLog
}
