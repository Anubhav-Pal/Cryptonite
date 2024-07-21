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
  price_change_percentage: number;
};

export const columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="font-semibold">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "current_price",
    header: "Price",
    cell: ({ getValue }) => (
      <div className="text-green-500">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "market_cap",
    header: "Market Cap",
    cell: ({ getValue }) => {
      const valueStr = getValue<any>(); // Get the value and handle it as any
      const value =
        typeof valueStr === "string"
          ? parseFloat(valueStr.replace(/[^0-9.-]/g, "")) // Remove non-numeric characters
          : parseFloat(valueStr); // Convert directly if it's already a number

      const formattedValue = new Intl.NumberFormat("en-US").format(value);

      return <div className="">{formattedValue}</div>;
    },
  },
  {
    accessorKey: "price_change_percentage",
    header: "% Change",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <div
          className={`${Number(value) < 0 ? "text-red-500" : "text-green-600"}`}
        >
          {value}%
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Logo",
    cell: ({ getValue }) => (
      <Image
        src={getValue<string>()}
        alt="rate"
        width={40}
        height={40}
        objectFit="contain"
      />
    ),
  },
];
