import React from 'react';
import { MagnifyingGlassIcon, AcademicCapIcon, CalendarDaysIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../contexts/AppContext';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

export const VenueFilters: React.FC = () => {
  const { filters, setFilters } = useAppContext();

  const handleJufoChange = (jufo: string, checked: boolean) => {
    const newJufo = checked
      ? [...filters.jufo, jufo]
      : filters.jufo.filter(j => j !== jufo);
    setFilters({ ...filters, jufo: newJufo });
  };

  return (
    <div className="glass glass-border glass-shadow rounded-xl space-y-6 p-6">
        <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
          <FunnelIcon className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-semibold text-lg bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
          Filters
        </h2>
      </div>

      <div>
        <label htmlFor="search-input" className="flex items-center gap-2 text-sm font-medium mb-3">
          <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
          Search venues
        </label>
        <div className="relative">
          <Input
            id="search-input"
            type="text"
            placeholder="Search by name or summary..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="transition-all focus:ring-2 focus:ring-primary/30 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-3">
          <AcademicCapIcon className="h-4 w-4 text-muted-foreground" />
          JUFO Rating
        </label>
        <div className="space-y-3">
          {['1', '2', '3'].map((jufo) => (
            <label key={jufo} className="flex items-center space-x-3 cursor-pointer group">
              <Checkbox
                checked={filters.jufo.includes(jufo)}
                onCheckedChange={(checked) => handleJufoChange(jufo, checked as boolean)}
                className="transition-all group-hover:scale-105"
              />
              <span className="text-sm flex items-center gap-2">
                JUFO {jufo}
                <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white
                  ${jufo === '3' ? 'bg-jufo-3' : jufo === '2' ? 'bg-jufo-2' : 'bg-jufo-1'}`}>
                  {jufo}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <Checkbox
            checked={filters.showOnlyUpcoming}
            onCheckedChange={(checked) => setFilters({ ...filters, showOnlyUpcoming: checked as boolean })}
            className="transition-all group-hover:scale-105"
          />
          <span className="text-sm flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
            Show only upcoming venues
          </span>
        </label>
      </div>
    </div>
  );
};
