"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { CarListing } from "../lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface EditListingModalProps {
  listing: CarListing | null
  isOpen: boolean
  onClose: () => void
  onSave: (id: string, updates: Partial<CarListing>) => void
}

export default function EditListingModal({ listing, isOpen, onClose, onSave }: EditListingModalProps) {
  const [formData, setFormData] = useState<Partial<CarListing>>({})

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title,
        description: listing.description,
        make: listing.make,
        model: listing.model,
        year: listing.year,
        pricePerDay: listing.pricePerDay,
        location: listing.location,
        imageUrl: listing.imageUrl,
      })
    }
  }, [listing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (listing) {
      onSave(listing.id, formData)
      onClose()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "pricePerDay" ? Number(value) : value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto z-[99]">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title || ""} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location || ""} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="make">Make</Label>
              <Input id="make" name="make" value={formData.make || ""} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="model">Model</Label>
              <Input id="model" name="model" value={formData.model || ""} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" type="number" value={formData.year || ""} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="pricePerDay">Price per Day ($)</Label>
              <Input
                id="pricePerDay"
                name="pricePerDay"
                type="number"
                value={formData.pricePerDay || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" type="text" value={formData.imageUrl || ""} onChange={handleChange} />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
