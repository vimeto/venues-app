import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { AppProvider } from '../../contexts/AppContext';

describe('Header', () => {
  const renderHeader = () => {
    return render(
      <AppProvider>
        <Header />
      </AppProvider>
    );
  };

  it('renders the title and description', () => {
    renderHeader();
    
    expect(screen.getByText('ML Venues')).toBeInTheDocument();
    expect(screen.getByText('Track upcoming machine learning conferences')).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();
    
    const themeButton = screen.getByLabelText('Toggle theme');
    expect(themeButton).toBeInTheDocument();
    
    // Click the theme toggle button
    await user.click(themeButton);
    
    // Verify the document has the dark class
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});