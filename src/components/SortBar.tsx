export default function SortBar() {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-semibold" style={{ color: "var(--bc-muted)" }}>
        Sort by
      </div>

      <select
        className="rounded-xl border bg-white px-3 py-2 text-sm"
        style={{ borderColor: "var(--bc-border)" }}
        defaultValue="best"
      >
        <option value="best">Best</option>
        <option value="price_asc">Lowest price</option>
        <option value="duration_asc">Shortest duration</option>
      </select>
    </div>
  );
}
