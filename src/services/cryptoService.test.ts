import { describe, it, expect, vi, afterEach } from 'vitest';
import { getCryptoPrices } from './cryptoService';

describe('Servicio de criptomonedas', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('obtiene correctamente los precios', async () => {
    const preciosFalsos = {
      bitcoin: { usd: 90000 },
      ethereum: { usd: 3000 },
      solana: { usd: 150 }
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => preciosFalsos
    }));

    const resultado = await getCryptoPrices();

    expect(resultado).toEqual(preciosFalsos);
  });

  it('detecta errores de consulta', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false
    }));

    await expect(getCryptoPrices()).rejects.toThrow(
      'No se pudieron obtener los precios.'
    );
  });
});
