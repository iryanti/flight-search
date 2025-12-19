import { create } from "zustand";
import { fetchFlights as fetchFlightsApi } from "@/lib/api";

type SortKey = "recommendation" | "price_asc" | "duration_asc";

type FlightsState = {
  flights: any[];
  loading: boolean;
  error: string | null;

  priceMin: number | null;
  priceMax: number | null;

  maxDuration: number | null;

  sort: SortKey;
  selectedAirlines: string[];

  fetchFlights: () => Promise<void>;
  toggleAirline: (code: string) => void;
  setSort: (sort: SortKey) => void;
  setPriceMin: (v: number | null) => void;
  setPriceMax: (v: number | null) => void;
  setMaxDuration: (v: number | null) => void;
  setAllAirlines: (codes: string[]) => void;

  resetFilters: () => void;
};

export const useFlightsStore = create<FlightsState>((set, get) => ({
  flights: [],
  loading: false,
  error: null,

  selectedAirlines: [],
  sort: "recommendation",

  priceMin: null,
  priceMax: null,

  maxDuration: null,

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

  setSort: (sort) => set({ sort }),

  setPriceMin: (v) => set({ priceMin: v }),
  setPriceMax: (v) => set({ priceMax: v }),

  setMaxDuration: (v) => set({ maxDuration: v }),
  setAllAirlines: (codes) => set({ selectedAirlines: codes }),

  resetFilters: () =>
    set({
      selectedAirlines: [],
      sort: "recommendation",
      priceMin: null,
      priceMax: null,
      maxDuration: null,
    }),
}));
