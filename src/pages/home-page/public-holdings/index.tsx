"use client";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { API_URL } from "../../../../config";
import { apiKey } from "@/utils";
import Loader from "@/components/Loader";
import { DataTable } from "@/components/data-table/data-table";

export type Company = {
  name: string;
  symbol: string;
  total_holdings: number;
  value: number;
};

export type CompanyWithId = Company & { id: string };

export const columns: ColumnDef<CompanyWithId>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
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

export default function PublicHoldingTable() {
  const [marketHolding, setMarketHolding] = useState<CompanyWithId[]>([]);
  const [currentCoin, setCurrentCoin] = useState<string>("bitcoin");
  const [loading, setLoading] = useState<boolean>(true);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": apiKey,
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/companies/public_treasury/${currentCoin}`, options)
      .then((response) => response.json())
      .then((response) => {
        setMarketHolding(
          response.companies.map((company: any) => ({
            id: company.name,
            name: company.name,
            symbol: company.symbol,
            total_holdings: company.total_holdings,
            value: company.total_current_value_usd,
          }))
        );
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [currentCoin]);

  return (
    <div>
      <div className="text-white font-xl font-bold my-5">
        <div className="flex mt-5 font-normal rounded-full bg-gray-800 gap-1 w-full sm:w-1/2 p-1 items-center justify-between">
          <div
            onClick={() => setCurrentCoin("bitcoin")}
            className={`p-2 rounded-full w-full ${
              currentCoin === "bitcoin" ? "bg-gray-900" : ""
            } text-center cursor-pointer`}
          >
            Bitcoin
          </div>
          <div
            onClick={() => setCurrentCoin("ethereum")}
            className={`p-2 rounded-full w-full ${
              currentCoin === "ethereum" ? "bg-gray-900" : ""
            } text-center cursor-pointer`}
          >
            Ethereum
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-auto max-h-screen">
          <DataTable columns={columns} data={marketHolding} />
        </div>
      )}
    </div>
  );
}
