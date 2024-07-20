"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Company = {
  name: string;
  symbol: string;
  total_holdings: number;
  value: number;
};

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "total_holdings",
    header: "Net Holdings",
  },
  {
    accessorKey: "value",
    header: "Total Value",
  },
];
