import { memo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CarListing } from "../lib/types"
import { Check, Edit, X } from "lucide-react"
import { TableCell, TableRow } from "@/components/ui/table"

interface RowProps {
  listing: CarListing
  handleStatusChange: (id: string, action: "approve" | "reject") => void
  handleEdit: (listing: CarListing) => void
}

const ListingRow = memo(function ListingRow({
  listing,
  handleStatusChange,
  handleEdit,
}: RowProps) {
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <TableRow key={listing.id}>
        <TableCell className="min-w-[280px]">
        <div className="flex items-center">
            <div className="flex-shrink-0 h-16 w-24">
            <Image
                src={listing.imageUrl || "/placeholder.svg"}
                alt={listing.title}
                width={96}
                height={64}
                className="h-16 w-24 object-cover rounded-md"
            />
            </div>
            <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{listing.title}</div>
            <div className="text-sm text-gray-500">
                {listing.year} {listing.make} {listing.model}
            </div>
            <div className="text-sm text-gray-500">{listing.location}</div>
            </div>
        </div>
        </TableCell>
        <TableCell>
        <div className="text-sm font-medium text-gray-900">AED {listing.pricePerDay}</div>
        </TableCell>
        <TableCell>
        <Badge variant={getStatusVariant(listing.status)}>{listing.status}</Badge>
        </TableCell>
        <TableCell className="text-sm text-gray-500">{listing.submittedBy}</TableCell>
        <TableCell>
        <div className="flex space-x-2">
            {listing.status === "pending" && (
            <>
                <Button
                size="sm"
                onClick={() => handleStatusChange(listing.id, "approve")}
                className="bg-green-600 hover:bg-green-700"
                >
                <Check className="w-3 h-3 mr-1" />
                Approve
                </Button>
                <Button
                size="sm"
                variant="destructive"
                onClick={() => handleStatusChange(listing.id, "reject")}
                className="text-white"
                >
                <X className="w-3 h-3 mr-1" />
                Reject
                </Button>
            </>
            )}
            <Button size="sm" variant="outline" onClick={() => handleEdit(listing)}>
            <Edit className="w-3 h-3 mr-1" />
            Edit
            </Button>
        </div>
        </TableCell>
    </TableRow>
  )
}, (prevProps, nextProps) => {
  const prev = prevProps.listing;
  const next = nextProps.listing;

  return (
    prev.id === next.id &&
    prev.status === next.status &&
    prev.submittedBy === next.submittedBy &&
    prev.pricePerDay === next.pricePerDay &&
    prev.imageUrl === next.imageUrl &&
    prev.make === next.make &&
    prev.model === next.model &&
    prev.year === next.year &&
    prev.location === next.location &&
    prev.title === next.title &&
    prev.description === next.description &&
    prev.lastModified === next.lastModified &&
    prev.modifiedBy === next.modifiedBy &&
    prev.submittedAt === next.submittedAt
  );
})

export default ListingRow