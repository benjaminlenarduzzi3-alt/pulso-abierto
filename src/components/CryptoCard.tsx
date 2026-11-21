
import React from 'react';

interface CryptoCardProps {
  name: string;
  price: number;
}

function CryptoCard({ name, price }: CryptoCardProps) {
  return (
    <article className="crypto-card">
      <h2>{name}</h2>
      <p>USD ${price.toLocaleString('en-US')}</p>
    </article>
  );
}

export default CryptoCard;
