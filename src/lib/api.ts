import type { Flight } from "@/types/flight";

export async function fetchFlights(): Promise<Flight[]> {
  const res = await fetch(`/mock/flights.json`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch flights (${res.status})`);
  }

  return res.json();
}
