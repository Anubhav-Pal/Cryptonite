"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { API_URL } from "../../../../config";
import { apiKey } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table/data-table";

export default function TrendingTable() {
  const [trendingCoins, setTrendingCoins] = useState([]);
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
    fetch(`${API_URL}/search/trending`, options)
      .then((response) => response.json())
      .then((response) => {
        setTrendingCoins(response.coins);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  const data = trendingCoins.map((coin) => {
    const { item } = coin;
    const { coin_id, name, symbol, small, market_cap_rank, data } = item;
    const { price, market_cap, total_volume, sparkline } = data;
    const coinData = {
      id: coin_id, // Add this line
      name,
      symbol,
      small,
      market_cap_rank,
      price,
      market_cap,
      total_volume,
      sparkline,
    };
    return coinData;
  });

  return (
    <div className="overflow-auto">
      {loading ? (
        <Skeleton className="w-full h-full rounded-full" />
      ) : (
        <div className="overflow-auto max-h-screen">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
