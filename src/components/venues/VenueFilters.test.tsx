import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VenueFilters } from './VenueFilters';
import { AppProvider } from '../../contexts/AppContext';

describe('VenueFilters', () => {
  const renderFilters = () => {
    return render(
      <AppProvider>
        <VenueFilters />
      </AppProvider>
    );
  };

  it('renders all filter controls', () => {
    renderFilters();
    
    expect(screen.getByLabelText('Search venues')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by name or summary...')).toBeInTheDocument();
    expect(screen.getByText('JUFO Rating')).toBeInTheDocument();
    expect(screen.getByText('JUFO 1')).toBeInTheDocument();
    expect(screen.getByText('JUFO 2')).toBeInTheDocument();
    expect(screen.getByText('JUFO 3')).toBeInTheDocument();
    expect(screen.getByText('Show only upcoming venues')).toBeInTheDocument();
  });

  it('updates search query when typing', async () => {
    const user = userEvent.setup();
    renderFilters();
    
    const searchInput = screen.getByPlaceholderText('Search by name or summary...');
    await user.type(searchInput, 'AAAI');
    
    expect(searchInput).toHaveValue('AAAI');
  });

  it('toggles JUFO filter checkboxes', async () => {
    const user = userEvent.setup();
    renderFilters();
    
    const jufo1Checkbox = screen.getByRole('checkbox', { name: /JUFO 1/i });
    expect(jufo1Checkbox).not.toBeChecked();
    
    await user.click(jufo1Checkbox);
    expect(jufo1Checkbox).toBeChecked();
    
    await user.click(jufo1Checkbox);
    expect(jufo1Checkbox).not.toBeChecked();
  });

  it('toggles upcoming venues filter', async () => {
    const user = userEvent.setup();
    renderFilters();
    
    const upcomingCheckbox = screen.getByRole('checkbox', { name: /Show only upcoming venues/i });
    expect(upcomingCheckbox).toBeChecked(); // Default is true
    
    await user.click(upcomingCheckbox);
    expect(upcomingCheckbox).not.toBeChecked();
  });
});