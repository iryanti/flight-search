"use client";

import { useEffect, useMemo, useState } from "react";
import { useFlightsStore } from "@/store/flightsStore";
import FlightCard from "./FlightCard";
import FilterSidebar from "./FilterSidebar";
import SortBar from "./SortBar";
import MobileBottomBar from "./MobileBottomBar";
import BottomSheet from "./BottomSheet";
import FlightCardSkeleton from "./FlightCardSkeleton";
import ErrorState from "./ErrorState";
import { Flight } from "@/types/flight";

export default function FlightsClient() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const {
    flights,
    loading,
    error,
    fetchFlights,
    selectedAirlines,
    sort,
    maxDuration,
    resetFilters,
    priceMin,
    priceMax,
  } = useFlightsStore();

  const filteredFlights = useMemo(() => {
    let result: Flight[] = flights;

    // Filter by airline
    if (selectedAirlines.length > 0) {
      result = result.filter((flight) =>
        selectedAirlines.includes(flight.airline.code)
      );
    }

    // Filter by minimum price
    if (priceMin !== null) {
      result = result.filter(
        (flight) => Number(flight.price.amount) >= priceMin
      );
    }

    // Filter by maximum price
    if (priceMax !== null) {
      result = result.filter(
        (flight) => Number(flight.price.amount) <= priceMax
      );
    }

    // Filter by duration
    if (maxDuration !== null) {
      result = result.filter(
        (flight) => Number(flight.duration) <= maxDuration
      );
    }

    // Sorting
    const sortedFlights = [...result];

    if (sort === "price_asc") {
      sortedFlights.sort(
        (a, b) => Number(a.price.amount) - Number(b.price.amount)
      );
    }

    if (sort === "duration_asc") {
      sortedFlights.sort((a, b) => Number(a.duration) - Number(b.duration));
    }

    return sortedFlights;
  }, [flights, selectedAirlines, priceMin, priceMax, maxDuration, sort]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  if (loading) {
    return (
      <main className="p-4 md:p-6 max-w-6xl mx-auto pb-20 md:pb-6">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <FlightCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }
  if (error) {
    return (
      <main className="p-4 md:p-6 max-w-6xl mx-auto pb-20 md:pb-6">
        <ErrorState message={error} onRetry={fetchFlights} />
      </main>
    );
  }

  const EmptyState = () => (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="text-lg font-semibold">No flights found</div>
      <div className="text-sm text-gray-600 mt-1">
        Try adjusting your filters.
      </div>

      <button
        className="mt-4 px-4 py-2 rounded-xl text-white font-semibold cursor-pointer"
        style={{ background: "var(--bc-primary)" }}
        onClick={resetFilters}
      >
        Reset filters
      </button>
    </div>
  );

  return (
    <main className="p-4 md:p-6  mx-auto pb-20 md:pb-6">
      {/* Desktop layout */}
      <div className="hidden md:flex gap-5 items-start">
        <aside className="w-[360px] flex-none">
          <FilterSidebar />
        </aside>

        <section className="flex-1 min-w-0">
          <SortBar />

          {filteredFlights.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {filteredFlights.map((flight: Flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="mb-3">
          <div className="text-lg font-semibold">All flights</div>
          <div className="text-sm text-gray-500">
            Showing {filteredFlights.length} flights
          </div>
        </div>

        {filteredFlights.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {filteredFlights.map((flight: Flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile bottom bar */}
      <MobileBottomBar
        onSortClick={() => setOpenSort(true)}
        onFilterClick={() => setOpenFilter(true)}
      />

      <BottomSheet
        open={openFilter}
        title="Filter"
        onClose={() => setOpenFilter(false)}
      >
        <FilterSidebar compact />
      </BottomSheet>

      <BottomSheet
        open={openSort}
        title="Sort"
        onClose={() => setOpenSort(false)}
      >
        <SortBar mobile />
      </BottomSheet>
    </main>
  );
}
