import { Flight } from "@/types/flight";
import { minutesToHours } from "@/utils/time";

type FlightCardProps = {
  flight: Flight;
  isSelected: boolean;
  onSelect: () => void;
};

export default function FlightCard({
  flight,
  isSelected,
  onSelect,
}: FlightCardProps) {
  const price = Number(flight.price.amount ?? 0);
  const originalPrice = Number(flight.price.original ?? 0);
  const durationMinutes = Number(flight.duration ?? 0);

  const hasDiscount = originalPrice > price;
  const discountAmount = hasDiscount ? originalPrice - price : 0;

  return (
    <div
      className={`
    p-5 flex flex-col gap-4
    md:flex-row md:flex-wrap md:items-center md:justify-between
    rounded-2xl border
    bg-[var(--bc-card)]
    shadow-sm
    transition-all duration-200 ease-out

    ${
      isSelected
        ? "border-blue-500 ring-1 ring-blue-500/30"
        : "border-[color:var(--bc-border)] hover:border-blue-300"
    }

    hover:-translate-y-1 hover:shadow-lg
  `}
    >
      <div className="flex items-start gap-4 min-w-0 md:min-w-[260px]">
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
            style={{ borderColor: "var(--bc-border)" }}
          >
            <img
              src="https://fonts.gstatic.com/s/i/materialicons/luggage/v6/24px.svg"
              alt="Baggage"
              className="w-4 h-4 opacity-80 dark:invert"
            />
            {flight.baggage || "0kg"}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex items-center justify-center gap-6">
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
            {minutesToHours(durationMinutes)}
          </div>

          <div className="flex items-center justify-center my-2 opacity-70 dark:invert">
            <span className="mx-2 h-2 w-2 rounded-full bg-gray-300" />
            <span className="h-[2px] w-16 bg-gray-300" />
            <img
              src="https://fonts.gstatic.com/s/i/materialicons/flight/v6/24px.svg"
              alt="Flight"
              className="mx-2 w-4 h-4 rotate-90 opacity-60"
            />
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

      <div className="min-w-0 md:min-w-[240px] flex flex-col items-end gap-3">
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
        className="px-6 py-3 rounded-xl text-white font-semibold w-full md:w-[180px] md:flex-none"
        style={{ background: "var(--bc-primary)" }}
        onClick={onSelect}
      >
        Choose
      </button>
    </div>
  );
}
