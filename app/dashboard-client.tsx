"use client"

import { useState } from "react"
// import Image from "next/image"
import { useRouter } from "next/navigation"
import type { CarListing } from "../lib/types"
import { useNotifications } from "../context/NotificationContext"
import EditListingModal from "../components/EditListingModal"
import { Car, Check, X, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ListingRow from "./ListingRow"

interface DashboardClientProps {
  initialListings: CarListing[]
  initialTotal: number
  initialPage: number
  initialTotalPages: number
  initialStatus: string
}

export default function DashboardClient({
  initialListings,
  initialTotal,
  initialPage,
  initialTotalPages,
  initialStatus,
}: DashboardClientProps) {
  const [listings, setListings] = useState(initialListings)
  const [total, setTotal] = useState(initialTotal)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [statusFilter, setStatusFilter] = useState(initialStatus)
  const [editingListing, setEditingListing] = useState<CarListing | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { addNotification } = useNotifications()
  const router = useRouter()

  const fetchListings = async (page = 1, status = "all") => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/listings?page=${page}&limit=10&status=${status}`)
      const data = await response.json()

      setListings(data.listings)
      setTotal(data.total)
      setCurrentPage(data.page)
      setTotalPages(data.totalPages)

      router.push(`/?page=${page}&status=${status}`)
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to fetch listings",
      })
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, action: "approve" | "reject") => {
    try {
      const response = await fetch("/api/listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      })

      if (response.ok) {
        const updatedListing = await response.json()
        setListings((prev) => prev.map((listing) => (listing.id === id ? updatedListing : listing)))

        addNotification({
          type: "success",
          message: `Listing ${action}d successfully`,
        })
      } else {
        throw new Error("Failed to update listing")
      }
    } catch (error) {
      addNotification({
        type: "error",
        message: `Failed to ${action} listing`,
      })
      console.error(error);
    }
  }

  const handleEdit = (listing: CarListing) => {
    setEditingListing(listing)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = async (id: string, updates: Partial<CarListing>) => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updatedListing = await response.json()
        setListings((prev) => prev.map((listing) => (listing.id === id ? updatedListing : listing)))

        addNotification({
          type: "success",
          message: "Listing updated successfully",
        })
      } else {
        throw new Error("Failed to update listing")
      }
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to update listing",
      })
      console.error(error);
    }
  }

  const handleFilterChange = (status: string) => {
    setStatusFilter(status)
    fetchListings(1, status)
  }

  const handlePageChange = (page: number) => {
    fetchListings(page, statusFilter)
  }

  // const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
  //   switch (status) {
  //     case "approved":
  //       return "default"
  //     case "rejected":
  //       return "destructive"
  //     case "pending":
  //       return "secondary"
  //     default:
  //       return "secondary"
  //   }
  // }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-2xl font-semibold text-gray-900">{total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Filter className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {listings.filter((l) => l.status === "pending").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {listings.filter((l) => l.status === "approved").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {listings.filter((l) => l.status === "rejected").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400 ms-3" />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap py-3">
                Filter by status:
              </span>
              <div className="flex space-x-2 py-3 pe-2 overflow-x-auto">
                {["all", "pending", "approved", "rejected"].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listings Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car Details</TableHead>
                  <TableHead>Price/Day</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : listings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                      No listings found
                    </TableCell>
                  </TableRow>
                ) : (
                  listings.map((listing) => (
                    <ListingRow
                      key={listing.id}
                      listing={listing}
                      handleStatusChange={handleStatusChange}
                      handleEdit={handleEdit}
                     />
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="flex-1 flex justify-between sm:hidden">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
                      <span className="font-medium">{Math.min(currentPage * 10, total)}</span> of{" "}
                      <span className="font-medium">{total}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <EditListingModal
        listing={editingListing}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingListing(null)
        }}
        onSave={handleSaveEdit}
      />
    </>
  )
}
