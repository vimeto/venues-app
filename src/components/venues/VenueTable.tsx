import React, { useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useAppContext } from '../../contexts/AppContext';
import type { Venue } from '../../types/venue';
import venuesData from '../../data/venues.json';

const columnHelper = createColumnHelper<Venue>();

export const VenueTable: React.FC = () => {
  const { filters, sort, setSort } = useAppContext();
  
  const [sorting, setSorting] = React.useState<SortingState>([]);

  React.useEffect(() => {
    if (sort.column) {
      setSorting([{ id: sort.column, desc: sort.direction === 'desc' }]);
    } else {
      setSorting([]);
    }
  }, [sort]);

  const columns = useMemo<ColumnDef<Venue, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Venue',
        cell: (info) => (
          <a
            href={info.row.original.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 group transition-colors"
          >
            {info.getValue()}
            <svg className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ),
      }),
      columnHelper.accessor('jufo', {
        header: 'JUFO Rating',
        cell: (info) => {
          const value = info.getValue();
          const getJufoStyles = (level: number) => {
            switch(level) {
              case 3:
                return {
                  container: 'bg-linear-to-br from-jufo-3/20 to-jufo-3/10 border-jufo-3/30',
                  text: 'text-jufo-3',
                  label: 'Highest Level',
                  stars: 3,
                  size: 'scale-110'
                };
              case 2:
                return {
                  container: 'bg-linear-to-br from-jufo-2/20 to-jufo-2/10 border-jufo-2/30',
                  text: 'text-jufo-2',
                  label: 'Leading Level',
                  stars: 2,
                  size: 'scale-105'
                };
              default:
                return {
                  container: 'bg-linear-to-br from-jufo-1/20 to-jufo-1/10 border-jufo-1/30',
                  text: 'text-jufo-1',
                  label: 'Basic Level',
                  stars: 1,
                  size: 'scale-100'
                };
            }
          };

          const styles = getJufoStyles(value);
          
          return (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${styles.container} transition-all hover:${styles.size} group`}>
              <div className={`font-bold text-sm ${styles.text}`}>
                {value}
              </div>
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  i < styles.stars ? (
                    <StarIconSolid key={i} className={`h-3 w-3 ${styles.text} transition-all group-hover:scale-110`} />
                  ) : (
                    <StarIcon key={i} className="h-3 w-3 text-gray-300 dark:text-gray-600" />
                  )
                ))}
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('abstractDue', {
        header: 'Abstract Due',
        cell: (info) => {
          const value = info.getValue();
          const isBold = value.includes('**');
          const cleanValue = value.replace(/\*\*/g, '');
          return (
            <span className={isBold ? 'font-semibold' : ''}>
              {cleanValue}
            </span>
          );
        },
      }),
      columnHelper.accessor('paperDue', {
        header: 'Paper Due',
        cell: (info) => {
          const value = info.getValue();
          const isBold = value.includes('**');
          const cleanValue = value.replace(/\*\*/g, '');
          return (
            <span className={isBold ? 'font-semibold' : ''}>
              {cleanValue}
            </span>
          );
        },
      }),
      columnHelper.accessor('notifications', {
        header: 'Notifications',
        cell: (info) => {
          const value = info.getValue();
          const isBold = value.includes('**');
          const cleanValue = value.replace(/\*\*/g, '');
          return (
            <span className={isBold ? 'font-semibold' : ''}>
              {cleanValue}
            </span>
          );
        },
      }),
      columnHelper.accessor('confDates', {
        header: 'Conference Dates',
        cell: (info) => {
          const value = info.getValue();
          const isBold = value.includes('**');
          const cleanValue = value.replace(/\*\*/g, '');
          return (
            <span className={isBold ? 'font-semibold' : ''}>
              {cleanValue}
            </span>
          );
        },
      }),
      columnHelper.accessor('summary', {
        header: 'Summary',
        cell: (info) => (
          <span className="text-sm text-muted-foreground">
            {info.getValue()}
          </span>
        ),
      }),
    ],
    []
  );

  const filteredData = useMemo(() => {
    let data = venuesData as Venue[];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      data = data.filter(
        (venue) =>
          venue.name.toLowerCase().includes(query) ||
          venue.summary.toLowerCase().includes(query)
      );
    }

    // Apply JUFO filter
    if (filters.jufo.length > 0) {
      data = data.filter((venue) =>
        filters.jufo.includes(venue.jufo.toString())
      );
    }

    // Apply upcoming filter
    if (filters.showOnlyUpcoming) {
      data = data.filter((venue) => {
        // Simple check: if the year in confDates is 2025 or later
        const match = venue.confDates.match(/202[5-9]/);
        return match !== null;
      });
    }

    return data;
  }, [filters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
      if (newSorting.length > 0) {
        setSort({
          column: newSorting[0].id as keyof Venue,
          direction: newSorting[0].desc ? 'desc' : 'asc',
        });
      } else {
        setSort({ column: null, direction: 'asc' });
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full border-collapse min-w-[900px]">
        <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800/50 z-10 border-b border-gray-200 dark:border-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left p-4 font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transition-colors group"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center space-x-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() && (
                      <span className="ml-1 transition-all">
                        {header.column.getIsSorted() === 'desc' ? (
                          <ChevronDownIcon className="h-4 w-4 text-primary" />
                        ) : header.column.getIsSorted() === 'asc' ? (
                          <ChevronUpIcon className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronUpIcon className="h-4 w-4" />
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, idx) => (
            <tr
              key={row.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors animate-in"
              style={{ animationDelay: `${idx * 0.02}s` }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {filteredData.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">No venues found</p>
          <p className="text-sm mt-1">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};