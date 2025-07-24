import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FilterState, SortState } from '../types/venue';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  sort: SortState;
  setSort: (sort: SortState) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [filters, setFilters] = useState<FilterState>({
    jufo: [],
    showOnlyUpcoming: true,
    searchQuery: '',
  });

  const [sort, setSort] = useState<SortState>({
    column: null,
    direction: 'asc',
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        filters,
        setFilters,
        sort,
        setSort,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};