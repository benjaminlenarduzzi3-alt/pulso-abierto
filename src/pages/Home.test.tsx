import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { useFavoritesStore } from '../store/favoritesStore';

vi.mock('../services/cryptoService', () => ({
  getCryptoPrices: vi.fn()
}));

import { getCryptoPrices } from '../services/cryptoService';

const preciosFalsos = {
  bitcoin: { usd: 90000 },
  ethereum: { usd: 3000 },
  solana: { usd: 150 }
};

beforeEach(() => {
  localStorage.clear();
  useFavoritesStore.setState({ favorites: [] });
  vi.mocked(getCryptoPrices).mockReset();
});

describe('Favoritos en la página principal', () => {
  it('permite agregar y quitar Bitcoin de favoritos', async () => {
    const user = userEvent.setup();

    vi.mocked(getCryptoPrices).mockResolvedValue(preciosFalsos);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole('button', { name: 'Consultar precios' })
    );

    const tarjetaBitcoin = screen.getByRole('link', { name: /Bitcoin/ });
    const botonAgregar = within(tarjetaBitcoin.parentElement!).getByRole(
      'button',
      { name: 'Agregar a favoritos' }
    );

    await user.click(botonAgregar);

    expect(
      screen.getByRole('button', { name: 'Quitar de favoritos' })
    ).toHaveAttribute('aria-pressed', 'true');

    const lista = screen.getByRole('list');
    expect(
      within(lista).getByRole('link', { name: 'Bitcoin' })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Quitar de favoritos' })
    );

    expect(
      screen.getByText('Todavía no tenés criptomonedas favoritas.')
    ).toBeInTheDocument();
  });
});

describe('Recuperación de errores', () => {
  it('permite volver a consultar después de un error', async () => {
    const user = userEvent.setup();

    vi.mocked(getCryptoPrices)
      .mockRejectedValueOnce(new Error('Error de prueba'))
      .mockResolvedValueOnce(preciosFalsos);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole('button', { name: 'Consultar precios' })
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudieron cargar los precios.'
    );

    await user.click(
      screen.getByRole('button', { name: 'Consultar precios' })
    );

    expect(
      await screen.findByRole('heading', { name: 'Bitcoin' })
    ).toBeInTheDocument();
  });
});
