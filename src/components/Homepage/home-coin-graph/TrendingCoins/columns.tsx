"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Coin = {
  coin_id: number;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
  market_cap_rank: number;
  small: string;
  total_volume: number;
  sparkline: string;
};

export const columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "market_cap",
    header: "Market Cap",
  },
  {
    accessorKey: "total_volume",
    header: "Total Volume",
  },
  {
    accessorKey: "sparkline",
    header: "Sparkline",
  },
];
