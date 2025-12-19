"use client";

import { useEffect, useMemo } from "react";
import { useFlightsStore } from "@/store/flightsStore";
import FlightCard from "./FlightCard";
import FilterSidebar from "./FilterSidebar";
import SortBar from "./SortBar";

export default function FlightsClient() {
const { flights, loading, error, fetchFlights, selectedAirlines, sort, maxDuration } = useFlightsStore();


const visibleFlights = useMemo(() => {
  let list = flights;
  if (selectedAirlines.length > 0) {
    list = list.filter((f: any) => selectedAirlines.includes(f.airline.code));
  }

  if (maxDuration !== null) {
    list = list.filter((f: any) => Number(f.duration) <= maxDuration);
  }

  const sorted = [...list];

  if (sort === "price_asc") {
    sorted.sort((a: any, b: any) => Number(a.price.amount) - Number(b.price.amount));
  }

  if (sort === "duration_asc") {
    sorted.sort((a: any, b: any) => Number(a.duration) - Number(b.duration));
  }

  return sorted;
}, [flights, selectedAirlines, sort, maxDuration]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  if (loading) return <p className="p-6">Loading flights…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-5">
        <FilterSidebar />

        <section className="flex-1">
          <SortBar />

          <div className="space-y-4">
            {visibleFlights.map((f: any) => (
              <FlightCard key={f.id} f={f} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
