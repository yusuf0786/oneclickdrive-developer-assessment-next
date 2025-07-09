import { addAuditLog, updateListing } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const updates = await request.json();
  const updatedListing = updateListing(id, { ...updates, modifiedBy: "admin" });
  addAuditLog({
    listingId: id,
    action: "edit",
    performedBy: "admin",
    timestamp: new Date().toISOString(),
    details: "Listing details updated",
  });

  if (updatedListing) {
    return NextResponse.json(updatedListing);
  } else {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }
}
