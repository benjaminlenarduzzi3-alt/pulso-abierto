
const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

export interface CryptoPrices {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  solana: { usd: number };
}

export async function getCryptoPrices(): Promise<CryptoPrices> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('No se pudieron obtener los precios.');
  }

  return await response.json();
}
