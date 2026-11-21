
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCryptoPrices, CryptoPrices } from '../services/cryptoService';
import CryptoCard from '../components/CryptoCard';
import { useFavoritesStore } from '../store/favoritesStore';
import { cryptoNames } from '../constants/cryptos';


function Home() {
  const [prices, setPrices] = useState<CryptoPrices | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [consulta, setConsulta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  async function loadPrices() {
    setLoading(true);
    setError('');

    try {
      const data = await getCryptoPrices();
      setPrices(data);
    } catch {
      setError('No se pudieron cargar los precios. Intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consulta.trim()) {
      setMensaje('Escribí una consulta antes de enviar.');
      return;
    }

    setMensaje('Tu consulta fue enviada correctamente.');
    setConsulta('');
  }

  return (
    <main>
      <h1>Precios de criptomonedas</h1>

      <button onClick={loadPrices} disabled={loading}>
        {loading ? 'Consultando...' : 'Consultar precios'}
      </button>

      {error && <p role="alert">{error}</p>}

      {prices && (
        <section>
          {Object.keys(cryptoNames).map((id) => (
            <div key={id}>
              <Link to={`/crypto/${id}`}>
                <CryptoCard
                  name={cryptoNames[id]}
                  price={prices[id as keyof CryptoPrices].usd}
                />
              </Link>

              <button
                onClick={() => toggleFavorite(id)}
                aria-pressed={favorites.includes(id)}
              >
                {favorites.includes(id)
                  ? 'Quitar de favoritos'
                  : 'Agregar a favoritos'}
              </button>
            </div>
          ))}
        </section>
      )}

      <section>
        <h2>Consulta sobre criptomonedas</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="consulta">
            ¿Qué querés consultar?
          </label>

          <input
            id="consulta"
            name="consulta"
            type="text"
            value={consulta}
            onChange={(event) => {
              setConsulta(event.target.value);
              setMensaje('');
            }}
            placeholder="Ejemplo: ¿Qué es Bitcoin?"
          />

          <button type="submit">
            Enviar consulta
          </button>
        </form>

        {mensaje && <p role="status">{mensaje}</p>}
      </section>

      <section>
        <h2>Mis favoritos</h2>

        {favorites.length === 0 ? (
          <p>Todavía no tenés criptomonedas favoritas.</p>
        ) : (
          <ul>
            {favorites.map((id) => (
              <li key={id}>
                <Link to={`/crypto/${id}`}>
                  {cryptoNames[id]}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Home;
