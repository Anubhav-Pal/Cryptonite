"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { API_URL } from "../../../../../config";
import { apiKey } from "@/utils";

export default function TrendingTable() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  //   const data = [
  //     {
  //       coin_id: 1,
  //       name: "Bitcoin",
  //       symbol: "BTC",
  //       market_cap: 800000000000,
  //       market_cap_rank: 1,
  //       price: 40000,
  //       small: "https://dummyimage.com/32x32/000/fff&text=B",
  //       total_volume: 35000000000,
  //       sparkline: "https://dummyimage.com/150x50/000/fff&text=SP1",
  //     },
  //     {
  //       coin_id: 1,
  //       name: "Bitcoin",
  //       symbol: "BTC",
  //       market_cap: 800000000000,
  //       market_cap_rank: 1,
  //       price: 40000,
  //       small: "https://dummyimage.com/32x32/000/fff&text=B",
  //       total_volume: 35000000000,
  //       sparkline: "https://dummyimage.com/150x50/000/fff&text=SP1",
  //     },
  //     {
  //       coin_id: 1,
  //       name: "Bitcoin",
  //       symbol: "BTC",
  //       market_cap: 800000000000,
  //       market_cap_rank: 1,
  //       price: 40000,
  //       small: "https://dummyimage.com/32x32/000/fff&text=B",
  //       total_volume: 35000000000,
  //       sparkline: "https://dummyimage.com/150x50/000/fff&text=SP1",
  //     },
  //     {
  //       coin_id: 1,
  //       name: "Bitcoin",
  //       symbol: "BTC",
  //       market_cap: 800000000000,
  //       market_cap_rank: 1,
  //       price: 40000,
  //       small: "https://dummyimage.com/32x32/000/fff&text=B",
  //       total_volume: 35000000000,
  //       sparkline: "https://dummyimage.com/150x50/000/fff&text=SP1",
  //     },
  //     {
  //       coin_id: 1,
  //       name: "Bitcoin",
  //       symbol: "BTC",
  //       market_cap: 800000000000,
  //       market_cap_rank: 1,
  //       price: 40000,
  //       small: "https://dummyimage.com/32x32/000/fff&text=B",
  //       total_volume: 35000000000,
  //       sparkline: "https://dummyimage.com/150x50/000/fff&text=SP1",
  //     },
  //     {
  //       coin_id: 1,
  //       name: "Bitcoin",
  //       symbol: "BTC",
  //       market_cap: 800000000000,
  //       market_cap_rank: 1,
  //       price: 40000,
  //       small: "https://dummyimage.com/32x32/000/fff&text=B",
  //       total_volume: 35000000000,
  //       sparkline: "https://dummyimage.com/150x50/000/fff&text=SP1",
  //     },
  //     {
  //       coin_id: 1,
  //       name: "Bitcoin",
  //       symbol: "BTC",
  //       market_cap: 800000000000,
  //       market_cap_rank: 1,
  //       price: 40000,
  //       small: "https://dummyimage.com/32x32/000/fff&text=B",
  //       total_volume: 35000000000,
  //       sparkline: "https://dummyimage.com/150x50/000/fff&text=SP1",
  //     },
  //   ];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": apiKey,
    },
  };

  useEffect(() => {
    fetch(`${API_URL}/search/trending`, options)
      .then((response) => response.json())
      .then((response) => setTrendingCoins(response.coins))
      .catch((err) => console.error(err));
  }, []);

  console.log("trending coins: ", trendingCoins);

  const data = trendingCoins.map((coin) => {
    const { item } = coin;
    const { coin_id, name, symbol, small, market_cap_rank, data } = item;
    const { price, market_cap, total_volume, sparkline } = data;
    const coinData = {
      coin_id,
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
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
