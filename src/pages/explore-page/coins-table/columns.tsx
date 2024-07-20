"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Coin = {
  id: number;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
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
    accessorKey: "current_price",
    header: "Price",
  },
  {
    accessorKey: "market_cap",
    header: "Market Cap",
  },
  {
    accessorKey: "price_change_percentage_24h",
    header: "% Change",
  },
  {
    accessorKey: "image",
    header: "Rate",
    cell: ({ getValue }) => (
      <Image
        width={30}
        height={30}
        src={getValue<string>()}
        alt="rate"
        className="h-8 w-24"
      />
    ),
  },
];
