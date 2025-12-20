export type SortKey = "recommendation" | "price_asc" | "duration_asc";

export type Flight = {
  id: string;
  airline: {
    name: string;
    code: string;
  };
  flightNumber: string;
  departure: {
    time: string;
    airport: string;
    date: string;
  };
  arrival: {
    time: string;
    airport: string;
    date: string;
  };
  duration: number;
  baggage: string;
  price: {
    amount: number;
    currency: "IDR" | string;
    original?: number;
  };
};
