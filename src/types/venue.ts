export interface Venue {
  id: string;
  name: string;
  url: string;
  jufo: number;
  abstractDue: string;
  paperDue: string;
  notifications: string;
  confDates: string;
  summary: string;
}

export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  jufo: string[];
  showOnlyUpcoming: boolean;
  searchQuery: string;
}

export interface SortState {
  column: keyof Venue | null;
  direction: SortDirection;
}