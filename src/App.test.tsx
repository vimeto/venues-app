import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    
    // Check that main components are rendered
    expect(screen.getByText('ML Venues')).toBeInTheDocument();
    expect(screen.getByLabelText('Search venues')).toBeInTheDocument();
    
    // Check that venue table exists by looking for venue names
    expect(screen.getByText('AAAI‑26')).toBeInTheDocument();
  });

  it('displays venue data in the table', () => {
    render(<App />);
    
    // Check that some venue data is visible
    expect(screen.getByText('AAAI‑26')).toBeInTheDocument();
    expect(screen.getByText('ICLR 2026')).toBeInTheDocument();
  });
});