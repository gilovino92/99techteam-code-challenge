// Service for fetching currency data and SVG token images

import type { TokenPrice, Wallet } from "../types/token.type";

const getTokenIcon = (currency: string) => {
  return `${import.meta.env.VITE_TOKEN_ICON_URL}/${currency}.svg`;
};

export async function fetchAllTokensPrice(): Promise<TokenPrice[]> {
  const priceRes = await fetch(import.meta.env.VITE_TOKEN_PRICE_URL);
  if (!priceRes.ok) {
    throw new Error(`Failed to fetch prices: ${priceRes.status}`);
  }

  const prices: TokenPrice[] = await priceRes.json();

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
    }, [] as TokenPrice[])
    .map((price) => ({
      currency: price.currency,
      icon: getTokenIcon(price.currency),
      date: price.date,
      price: price.price,
    }));
}

export async function fetchWalletBalance(): Promise<Wallet> {
  return Promise.resolve({
    balance: [
      {
        currency: "USDC",
        total: 2000,
        icon: getTokenIcon("USDC"),
      },
      {
        currency: "axlUSDC",
        total: Math.random() * 10000,
        icon: getTokenIcon("axlUSDC"),
      },
      {
        currency: "ATOM",
        total: Math.random() * 1000,
        icon: getTokenIcon("ATOM"),
      },
      {
        currency: "STATOM",
        total: Math.random() * 500,
        icon: getTokenIcon("STATOM"),
      },
      {
        currency: "OSMO",
        total: Math.random() * 2000,
        icon: getTokenIcon("OSMO"),
      },
      {
        currency: "rSWTH",
        total: Math.random() * 50000,
        icon: getTokenIcon("rSWTH"),
      },
      {
        currency: "STLUNA",
        total: Math.random() * 800,
        icon: getTokenIcon("STLUNA"),
      },
    ],
  });
}
