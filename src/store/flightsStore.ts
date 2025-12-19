import { create } from "zustand";
import { fetchFlights as fetchFlightsApi } from "@/lib/api";

type FlightsState = {
  flights: any[];
  loading: boolean;
  error: string | null;

  fetchFlights: () => Promise<void>;
};

export const useFlightsStore = create<FlightsState>((set) => ({
  flights: [],
  loading: false,
  error: null,

  fetchFlights: async () => {
    try {
      set({ loading: true, error: null });
      const data = await fetchFlightsApi();
      set({ flights: data });
    } catch {
      set({ error: "Failed to load flights" });
    } finally {
      set({ loading: false });
    }
  },
}));
