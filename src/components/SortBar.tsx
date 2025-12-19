import { useFlightsStore } from "@/store/flightsStore";

export default function SortBar() {
  const { sort, setSort } = useFlightsStore();

  return (
    <div className="flex items-center justify-between mb-4">
      <div
        className="text-sm font-semibold"
        style={{ color: "var(--bc-muted)" }}
      >
        Sort by
      </div>

      <select
        className="rounded-xl border bg-white px-3 py-2 text-sm"
        style={{ borderColor: "var(--bc-border)" }}
        value={sort}
        onChange={(e) => setSort(e.target.value as any)}
      >
        <option value="recommendation">Recommendation</option>
        <option value="price_asc">Lowest price</option>
        <option value="duration_asc">Shortest duration</option>
      </select>
    </div>
  );
}
