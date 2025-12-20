"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFlightsStore } from "@/store/flightsStore";

type AirlineItem = {
  code: string;
  name: string;
  count: number;
};

export default function FilterSidebar({ compact }: { compact?: boolean }) {
  const {
    flights,
    selectedAirlines,
    toggleAirline,
    setAllAirlines,
    resetFilters,
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,
    maxDuration,
    setMaxDuration,
  } = useFlightsStore();

  const airlineOptions = useMemo<AirlineItem[]>(() => {
    const result: AirlineItem[] = [];

    flights.forEach((flight) => {
      const existing = result.find(
        (airline) => airline.code === flight.airline.code
      );

      if (existing) {
        existing.count += 1;
      } else {
        result.push({
          code: flight.airline.code,
          name: flight.airline.name,
          count: 1,
        });
      }
    });

    return result.sort((a, b) => (a.name > b.name ? 1 : -1));
  }, [flights]);

  const allAirlineCodes = airlineOptions.map((airline) => airline.code);

  const hasAirlines = airlineOptions.length > 0;

  const isAllSelected =
    hasAirlines && selectedAirlines.length === airlineOptions.length;

  const isSomeSelected =
    selectedAirlines.length > 0 &&
    selectedAirlines.length < airlineOptions.length;

  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllAirlines(e.target.checked ? allAirlineCodes : []);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceMin(value ? Number(value) : null);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceMax(value ? Number(value) : null);
  };

  const handleMaxDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxDuration(value ? Number(value) : null);
  };

  useEffect(() => {
    if (!selectAllCheckboxRef.current) return;
    selectAllCheckboxRef.current.indeterminate = isSomeSelected;
  }, [isSomeSelected]);

  return (
    <div
      className="rounded-2xl border shadow-sm p-4"
      style={{
        background: "var(--bc-card)",
        borderColor: "var(--bc-border)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold" style={{ color: "var(--bc-text)" }}>
          Filters
        </h2>

        <button
          className="text-sm font-semibold cursor-pointer"
          style={{ color: "var(--bc-primary)" }}
          onClick={resetFilters}
          type="button"
        >
          Reset
        </button>
      </div>

      {/* Airlines */}
      <div className="mt-4">
        <div
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--bc-text)" }}
        >
          Airlines
        </div>

        {airlineOptions.length === 0 ? (
          <div className="text-sm" style={{ color: "var(--bc-muted)" }}>
            No airlines available
          </div>
        ) : (
          <div
            className="space-y-2 text-sm"
            style={{ color: "var(--bc-muted)" }}
          >
            {/* Select all */}
            <label
              htmlFor="select-all-airlines"
              className="flex items-center justify-between gap-3 font-medium"
            >
              <span className="flex items-center gap-2">
                <input
                  id="select-all-airlines"
                  ref={selectAllCheckboxRef}
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAllChange}
                />
                <span>Select all</span>
              </span>

              <span className="text-xs">{airlineOptions.length}</span>
            </label>

            <div className="h-px bg-gray-100" />

            {/* Airline list */}
            {airlineOptions.map((airline) => {
              const isChecked = selectedAirlines.includes(airline.code);
              const checkboxId = `airline-${airline.code}`;

              return (
                <label
                  key={airline.code}
                  htmlFor={checkboxId}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="flex items-center gap-2">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleAirline(airline.code)}
                    />
                    <span>{airline.name}</span>
                  </span>

                  <span className="text-xs">{airline.count}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mt-6">
        <div
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--bc-text)" }}
        >
          Price
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            className="w-1/2 rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: "var(--bc-border)" }}
            placeholder="Min"
            value={priceMin ?? ""}
            onChange={handlePriceMinChange}
          />

          <input
            type="number"
            min={0}
            className="w-1/2 rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: "var(--bc-border)" }}
            placeholder="Max"
            value={priceMax ?? ""}
            onChange={handlePriceMaxChange}
          />
        </div>

        <div className="mt-2 text-xs" style={{ color: "var(--bc-muted)" }}>
          Enter amount in IDR
        </div>
      </div>

      {/* Duration */}
      <div className="mt-6">
        <div
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--bc-text)" }}
        >
          Max Duration (minutes)
        </div>

        <input
          type="number"
          min={0}
          className="w-full rounded-lg border px-3 py-2 text-sm"
          style={{ borderColor: "var(--bc-border)" }}
          placeholder="e.g. 180"
          value={maxDuration ?? ""}
          onChange={handleMaxDurationChange}
        />

        <div className="mt-2 text-xs" style={{ color: "var(--bc-muted)" }}>
          Filter flights with duration ≤ max minutes
        </div>
      </div>
    </div>
  );
}
