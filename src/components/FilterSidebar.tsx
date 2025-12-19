"use client";

import { useMemo } from "react";
import { useFlightsStore } from "@/store/flightsStore";

export default function FilterSidebar() {
  const { flights, selectedAirlines, toggleAirline, resetFilters } =
    useFlightsStore();

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
      a.name.localeCompare(b.name)
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
            className="text-sm font-semibold"
            style={{ color: "var(--bc-primary)" }}
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <div className="mt-4">
          <div
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--bc-text)" }}
          >
            Airlines
          </div>

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
