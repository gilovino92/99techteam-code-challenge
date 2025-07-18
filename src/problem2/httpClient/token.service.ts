// Service for fetching currency data and SVG token images

import type { Token } from "../types/token.type";

export async function fetchAllTokens(): Promise<Token[]> {
  const priceRes = await fetch(import.meta.env.VITE_TOKEN_PRICE_URL);
  if (!priceRes.ok) {
    throw new Error(`Failed to fetch prices: ${priceRes.status}`);
  }

  const prices: Token[] = await priceRes.json();

  return prices
    .reduce((acc, price) => {
      const findIndex = acc.findIndex((p) => p.currency === price.currency);
      if (findIndex === -1) {
        acc.push(price);
      } else {
        if (price.date > acc[findIndex].date) {
          acc[findIndex] = price;
        }
      }
      return acc;
    }, [] as Token[])
    .map((price) => ({
      currency: price.currency,
      icon: `${import.meta.env.VITE_TOKEN_ICON_URL}/${price.currency}.svg`,
      date: price.date,
      price: price.price,
    }));
}
