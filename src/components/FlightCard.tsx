export default function FlightCard({ f }: { f: any }) {
  const logoUrl = `https://www.gstatic.com/flights/airline_logos/70px/${f.airline.code}.png`;

  const price = Number(f.price.amount || 0);
  const original = Number(f.price.original || 0);
  const saving = original > price ? original - price : 0;

  return (
    <div
      className="rounded-2xl border bg-white shadow-sm overflow-hidden"
      style={{ borderColor: "var(--bc-border)" }}
    >
      <div className="p-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4 min-w-[260px]">
          <img src={logoUrl} alt={f.airline.name} width={44} height={44} />

          <div className="flex flex-col gap-2">
            <div
              className="text-lg font-semibold"
              style={{ color: "var(--bc-text)" }}
            >
              {f.airline.name}
              <span className="text-sm" style={{ color: "var(--bc-muted)" }}>
                ({f.flightNumber})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm border"
                style={{
                  borderColor: "var(--bc-border)",
                  color: "var(--bc-text)",
                }}
              >
                🧳 {f.baggage ?? "0kg"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-6">
          <div className="text-center">
            <div
              className="text-2xl font-semibold"
              style={{ color: "var(--bc-text)" }}
            >
              {f.departure.time}
            </div>
            <div className="font-semibold" style={{ color: "var(--bc-muted)" }}>
              {f.departure.airport}
            </div>
          </div>

          <div className="min-w-[140px] text-center">
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--bc-muted)" }}
            >
              {f.duration}m
            </div>

            <div className="flex items-center justify-center my-2">
              <span className="h-[2px] w-12 bg-gray-300" />
              <span className="mx-2 h-2 w-2 rounded-full bg-gray-300" />
              <span className="h-[2px] w-12 bg-gray-300" />
            </div>
          </div>

          <div className="text-center">
            <div
              className="text-2xl font-semibold"
              style={{ color: "var(--bc-text)" }}
            >
              {f.arrival.time}
            </div>
            <div className="font-semibold" style={{ color: "var(--bc-muted)" }}>
              {f.arrival.airport}
            </div>
          </div>
        </div>

        <div className="min-w-[240px] flex flex-col items-end gap-3">
          {saving > 0 && (
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--bc-muted)" }}
            >
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full mr-2 border"
                style={{
                  borderColor: "var(--bc-primary)",
                  color: "var(--bc-primary)",
                }}
              >
                %
              </span>
              Save Rp {saving.toLocaleString("id-ID")} / pax
            </div>
          )}

          <div className="text-right">
            <div
              className="text-3xl font-bold"
              style={{ color: "var(--bc-primary)" }}
            >
              Rp {price.toLocaleString("id-ID")}
              <span
                className="text-base font-semibold"
                style={{ color: "var(--bc-muted)" }}
              >
                {" "}
                /pax
              </span>
            </div>
            {original > price && (
              <div
                className="text-sm line-through"
                style={{ color: "var(--bc-muted)" }}
              >
                Rp {original.toLocaleString("id-ID")}
              </div>
            )}
          </div>

          <button
            className="px-6 py-3 rounded-xl text-white font-semibold w-full md:w-[180px]"
            style={{ background: "var(--bc-primary)" }}
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
}
