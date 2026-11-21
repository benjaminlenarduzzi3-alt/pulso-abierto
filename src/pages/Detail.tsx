
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCryptoPrices, CryptoPrices } from '../services/cryptoService';
import { useFavoritesStore } from '../store/favoritesStore';

const cryptoNames: Record<string, string> = {
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  solana: 'Solana'
};

function Detail() {
  const { id } = useParams();
  const [prices, setPrices] = useState<CryptoPrices | null>(null);
  const [error, setError] = useState('');

  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    async function loadPrices() {
    setError('');

    try {
      const data = await getCryptoPrices();
      setPrices(data);
    } catch {
      setError('No se pudo cargar el precio.');
    }
  }

  useEffect(() => {
    loadPrices();
  }, []);

  if (!id || !cryptoNames[id]) {
    return <p>Criptomoneda no encontrada.</p>;
  }

  if (error) {
    return (
      <main>
        <p role="alert">{error}</p>
        <button onClick={loadPrices}>
          Intentar nuevamente
        </button>
        <p>
          <Link to="/">Volver al inicio</Link>
        </p>
      </main>
    );
  }

  if (!prices) {
    return <p>Cargando información...</p>;
  }

  const price = prices[id as keyof CryptoPrices].usd;
  const isFavorite = favorites.includes(id);

  return (
    <main>
      <h1>{cryptoNames[id]}</h1>
      <h2>Precio actual</h2>
      <p>USD ${price.toLocaleString('en-US')}</p>

      <button
        onClick={() => toggleFavorite(id)}
        aria-pressed={isFavorite}
      >
        {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </button>

      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </main>
  );
}

export default Detail;
