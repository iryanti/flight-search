"use client";

import { useEffect } from "react";
import { useFlightsStore } from "@/store/flightsStore";

export default function FlightsClient() {
  const { flights, loading, error, fetchFlights } = useFlightsStore();

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Flights</h1>

      <div className="space-y-3">
        {flights.map((flight: any) => (
          <div key={flight.id} className="border rounded-lg p-3">
            <div className="font-semibold">
              {flight.airline.name} - {flight.flightNumber}
            </div>

            <div className="text-sm text-gray-600">
              {flight.departure.time} {flight.departure.airport} → {flight.arrival.time}{" "}
              {flight.arrival.airport}
              {" - "}
              {flight.baggage}
              {" - "}
              {flight.duration}m
            </div>

            <div className="mt-1 font-bold">
              Rp {Number(flight.price.amount).toLocaleString("id-ID")}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
