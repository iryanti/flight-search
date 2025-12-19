"use client";

import { useEffect, useMemo } from "react";
import { useFlightsStore } from "@/store/flightsStore";
import FlightCard from "./FlightCard";
import FilterSidebar from "./FilterSidebar";
import SortBar from "./SortBar";

export default function FlightsClient() {
  const {
    flights,
    loading,
    error,
    fetchFlights,
    selectedAirlines,
  } = useFlightsStore();

  const filteredFlights = useMemo(() => {
    if (selectedAirlines.length === 0) return flights;
    return flights.filter((f: any) =>
      selectedAirlines.includes(f.airline.code)
    );
  }, [flights, selectedAirlines]);

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
            {filteredFlights.map((f: any) => (
              <FlightCard key={f.id} f={f} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
