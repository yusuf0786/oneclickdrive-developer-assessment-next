import { type NextRequest, NextResponse } from "next/server"
import { listings, updateListing, addAuditLog } from "../../../lib/data"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const status = searchParams.get("status")

  let filteredListings = listings
  if (status && status !== "all") {
    filteredListings = listings.filter((listing) => listing.status === status)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedListings = filteredListings.slice(startIndex, endIndex)

  return NextResponse.json({
    listings: paginatedListings,
    total: filteredListings.length,
    page: page,
    totalPages: Math.ceil(filteredListings.length / limit),
  })
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, action } = await request.json()

    if (!id || !action) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    let status: "approved" | "rejected"
    if (action === "approve") {
      status = "approved"
    } else if (action === "reject") {
      status = "rejected"
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 })
    }

    const updatedListing = updateListing(id, { status, modifiedBy: "admin" })

    if (updatedListing) {
      // Add audit log
      addAuditLog({
        listingId: id,
        action: action as "approve" | "reject",
        performedBy: "admin",
        timestamp: new Date().toISOString(),
        details: `Listing ${action}d by admin`,
      })

      return NextResponse.json(updatedListing)
    } else {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: error }, { status: 400 })
  }
}
