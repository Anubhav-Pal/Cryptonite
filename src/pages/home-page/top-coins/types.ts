interface Coin {
  id: string;
  name: string;
  symbol: string;
}

interface MarketCaps {
  time: number;
  value: number;
}
export type { Coin, MarketCaps };
