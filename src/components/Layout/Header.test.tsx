import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Header Component', () => {
  it('renders the logo and name', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/Lilian/i)).toBeInTheDocument();
    expect(screen.getByText(/Charron/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/CV/i)).toBeInTheDocument();
    expect(screen.getByText(/Compétences/i)).toBeInTheDocument();
  });
});
