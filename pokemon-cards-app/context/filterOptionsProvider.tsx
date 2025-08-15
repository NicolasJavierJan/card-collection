import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchFilterOptions, FilterOptions } from "../lib/apiFilters";

interface FilterOptionsContextValue {
  filterOptions: FilterOptions | null;
  refreshFilters: () => Promise<void>;
}

const FilterOptionsContext = createContext<FilterOptionsContextValue>({
  filterOptions: null,
  refreshFilters: async () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export function FilterOptionsProvider({ children }: ProviderProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

  const loadFilters = async () => {
    try {
      const data = await fetchFilterOptions();
      setFilterOptions(data);
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  return (
    <FilterOptionsContext.Provider value={{ filterOptions, refreshFilters: loadFilters }}>
      {children}
    </FilterOptionsContext.Provider>
  );
}

export function useFilterOptions() {
  return useContext(FilterOptionsContext);
}
