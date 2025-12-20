import { Flight } from "@/types/flight";

type FlightCardProps = {
  flight: Flight;
};

export default function FlightCard({ flight }: FlightCardProps) {
  const price = Number(flight.price.amount ?? 0);
  const originalPrice = Number(flight.price.original ?? 0);
  const durationMinutes = Number(flight.duration ?? 0);

  const hasDiscount = originalPrice > price;
  const discountAmount = hasDiscount ? originalPrice - price : 0;

  return (
    <div
      className="rounded-2xl border dark:bg-gray-800 dark:border-gray-700 shadow-sm"
      style={{ borderColor: "var(--bc-border)" }}
    >
      <div className="p-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4 min-w-[260px]">
          <img
            src={`https://www.gstatic.com/flights/airline_logos/70px/${flight.airline.code}.png`}
            alt={flight.airline.name}
            width={44}
            height={44}
          />

          <div className="flex flex-col gap-2 items-start">
            <div
              className="text-lg font-semibold"
              style={{ color: "var(--bc-text)" }}
            >
              {flight.airline.name}{" "}
              <span className="text-sm" style={{ color: "var(--bc-muted)" }}>
                ({flight.flightNumber})
              </span>
            </div>

            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm border"
              style={{
                borderColor: "var(--bc-border)",
                color: "var(--bc-text)",
              }}
            >
              🧳 {flight.baggage || "0kg"}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-6">
          <div className="text-center">
            <div
              className="text-2xl font-semibold"
              style={{ color: "var(--bc-text)" }}
            >
              {flight.departure.time}
            </div>
            <div className="font-semibold" style={{ color: "var(--bc-muted)" }}>
              {flight.departure.airport}
            </div>
          </div>

          <div className="min-w-[140px] text-center">
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--bc-muted)" }}
            >
              {durationMinutes}m
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
              {flight.arrival.time}
            </div>
            <div className="font-semibold" style={{ color: "var(--bc-muted)" }}>
              {flight.arrival.airport}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="min-w-[240px] flex flex-col items-end gap-3">
          {hasDiscount && (
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
              Save Rp {discountAmount.toLocaleString("id-ID")} / pax
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

            {hasDiscount && (
              <div
                className="text-sm line-through"
                style={{ color: "var(--bc-muted)" }}
              >
                Rp {originalPrice.toLocaleString("id-ID")}
              </div>
            )}
          </div>
        </div>

        <button
          className="px-6 py-3 rounded-xl text-white font-semibold w-full md:w-[180px]"
          style={{ background: "var(--bc-primary)" }}
        >
          Choose
        </button>
      </div>
    </div>
  );
}
