"use client";

import { useFlightsStore } from "@/store/flightsStore";
import { SortKey } from "@/types/flight";

type SortBarProps = {
  mobile?: boolean;
};

export default function SortBar({ mobile = false }: SortBarProps) {
  const { sort, setSort } = useFlightsStore();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortKey);
  };

  return (
    <div className={mobile ? "space-y-2" : "flex items-center mb-4 gap-2"}>
      {!mobile && (
        <div
          className="text-sm font-semibold"
          style={{ color: "var(--bc-muted)" }}
        >
          Sort by
        </div>
      )}

      {mobile ? (
        <div className="space-y-2">
          <button
            type="button"
            className="w-full text-left p-3 rounded-xl border"
            onClick={() => setSort("recommendation")}
          >
            Recommendation {sort === "recommendation" ? "✓" : ""}
          </button>

          <button
            type="button"
            className="w-full text-left p-3 rounded-xl border"
            onClick={() => setSort("price_asc")}
          >
            Lowest price {sort === "price_asc" ? "✓" : ""}
          </button>

          <button
            type="button"
            className="w-full text-left p-3 rounded-xl border"
            onClick={() => setSort("duration_asc")}
          >
            Shortest duration {sort === "duration_asc" ? "✓" : ""}
          </button>
        </div>
      ) : (
        <select
          className="rounded-xl border bg-white px-3 py-2 text-sm"
          style={{ borderColor: "var(--bc-border)" }}
          value={sort}
          onChange={handleSelectChange}
        >
          <option value="recommendation">Recommendation</option>
          <option value="price_asc">Lowest price</option>
          <option value="duration_asc">Shortest duration</option>
        </select>
      )}
    </div>
  );
}
