"use client";

import { useMemo } from "react";
import { useFlightsStore } from "@/store/flightsStore";

export default function FilterSidebar() {
  const {
    flights,
    selectedAirlines,
    toggleAirline,
    resetFilters,
    maxDuration,
    setMaxDuration,
    setAllAirlines,
  } = useFlightsStore();

  const airlines = useMemo(() => {
    const map = new Map<
      string,
      { code: string; name: string; count: number }
    >();

    flights.forEach((f: any) => {
      const code = f.airline.code;
      const name = f.airline.name;

      const existing = map.get(code);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(code, { code, name, count: 1 });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
  }, [flights]);

  return (
    <aside className="w-full md:w-[320px]">
      <div
        className="rounded-2xl border bg-white p-4 shadow-sm"
        style={{ borderColor: "var(--bc-border)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold" style={{ color: "var(--bc-text)" }}>
            Filters
          </h2>

          <button
            className="text-sm font-semibold cursor-pointer"
            style={{ color: "var(--bc-primary)" }}
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

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
            onChange={(e) => {
              const value = e.target.value;
              setMaxDuration(value ? Number(value) : null);
            }}
          />
        </div>

        <div className="mt-4">
          <div
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--bc-text)" }}
          >
            Airlines
          </div>

          <label className="flex items-center gap-2 mb-2 font-medium">
            <input
              type="checkbox"
              checked={
                selectedAirlines.length > 0 &&
                selectedAirlines.length === airlines.length
              }
              ref={(el) => {
                if (!el) return;
                el.indeterminate =
                  selectedAirlines.length > 0 &&
                  selectedAirlines.length < airlines.length;
              }}
              onChange={(e) => {
                if (e.target.checked) {
                  setAllAirlines(airlines.map((a) => a.code));
                } else {
                  setAllAirlines([]);
                }
              }}
            />
            <span>Select all</span>
          </label>

          <div
            className="space-y-2 text-sm"
            style={{ color: "var(--bc-muted)" }}
          >
            {airlines.map((a) => {
              const checked = selectedAirlines.includes(a.code);
              return (
                <label
                  key={a.code}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAirline(a.code)}
                    />
                    <span>{a.name}</span>
                  </span>

                  <span
                    className="text-xs"
                    style={{ color: "var(--bc-muted)" }}
                  >
                    {a.count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
