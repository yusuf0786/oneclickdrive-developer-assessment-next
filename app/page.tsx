import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import DashboardClient from "./dashboard-client"
import { listings as allListings } from "@/lib/data"
import Header from "@/components/Header"

function getListingsFromMemory(page = 1, status = "all") {
  const limit = 10
  let data = allListings

  if (status !== "all") {
    data = data.filter((l) => l.status === status)
  }

  const start = (page - 1) * limit
  const paginated = data.slice(start, start + limit)

  return {
    listings: paginated,
    total: data.length,
    page,
    totalPages: Math.ceil(data.length / limit),
  }
}

type SearchParams = {page: string, status: string};

export default async function DashboardPage(props: {params: Promise<SearchParams>, searchParams: Promise<SearchParams>}) {
  const searchParams = await props.searchParams

  const token = (await cookies()).get("auth-token")
  if (!token) redirect("/login")

  const page = Number.parseInt((searchParams?.page as string) ?? "1", 10)
  const status = (searchParams?.status as string) ?? "all"

  const data = getListingsFromMemory(page, status)

  return (
    <>
    <Header/>
    <DashboardClient
      initialListings={data.listings}
      initialTotal={data.total}
      initialPage={data.page}
      initialTotalPages={data.totalPages}
      initialStatus={status}
    />
    </>
  )
}
