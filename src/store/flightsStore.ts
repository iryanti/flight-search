import { create } from "zustand";
import { fetchFlights as fetchFlightsApi } from "@/lib/api";

type FlightsState = {
  flights: any[];
  loading: boolean;
  error: string | null;

  selectedAirlines: string[];

  fetchFlights: () => Promise<void>;
  toggleAirline: (code: string) => void;
  resetFilters: () => void;
};

export const useFlightsStore = create<FlightsState>((set, get) => ({
  flights: [],
  loading: false,
  error: null,

  selectedAirlines: [],

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
  toggleAirline: (code) => {
    const current = get().selectedAirlines;
    const exists = current.includes(code);
    set({
      selectedAirlines: exists
        ? current.filter((x) => x !== code)
        : [...current, code],
    });
  },

  resetFilters: () => set({ selectedAirlines: [] }),
}));
