import { create } from "zustand";
import { fetchFlights as fetchFlightsApi } from "@/lib/api";
import type { Flight, SortKey } from "@/types/flight";

type FlightsState = {
  flights: Flight[];
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
  setPriceMin: (value: number | null) => void;
  setPriceMax: (value: number | null) => void;
  setMaxDuration: (value: number | null) => void;
  setAllAirlines: (codes: string[]) => void;

  resetFilters: () => void;
};

const DEFAULT_FILTERS = {
  selectedAirlines: [] as string[],
  sort: "recommendation" as SortKey,
  priceMin: null as number | null,
  priceMax: null as number | null,
  maxDuration: null as number | null,
};

export const useFlightsStore = create<FlightsState>((set, get) => ({
  flights: [],
  loading: false,
  error: null,

  ...DEFAULT_FILTERS,

  fetchFlights: async () => {
    set({ loading: true, error: null });

    try {
      const flights = await fetchFlightsApi();
      set({ flights });
    } catch {
      set({ error: "Failed to load flights" });
    } finally {
      set({ loading: false });
    }
  },

  toggleAirline: (code) => {
    const { selectedAirlines } = get();
    const isSelected = selectedAirlines.includes(code);

    set({
      selectedAirlines: isSelected
        ? selectedAirlines.filter((x) => x !== code)
        : [...selectedAirlines, code],
    });
  },

  setSort: (sort) => set({ sort }),

  setPriceMin: (value) => set({ priceMin: value }),
  setPriceMax: (value) => set({ priceMax: value }),
  setMaxDuration: (value) => set({ maxDuration: value }),

  setAllAirlines: (codes) => set({ selectedAirlines: codes }),

  resetFilters: () => set(DEFAULT_FILTERS),
}));
