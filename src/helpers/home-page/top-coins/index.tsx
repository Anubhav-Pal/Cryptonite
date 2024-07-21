"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Coin, MarketCaps } from "./types";
import { API_URL } from "../../../../config";
import { Skeleton } from "@/components/ui/skeleton";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type MarketCapData = [time: number, value: number];

const TopCoins: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

  const [topCoins, setTopCoins] = useState<Coin[]>([]);
  const [marketCaps, setMarketCaps] = useState<MarketCapData[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/coins/markets?vs_currency=usd&per_page=3`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setTopCoins(response || []);
        if (response.length > 0) {
          getHistoricalData(response); // Pass response to getHistoricalData
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getHistoricalData = (coins: Coin[]) => {
    const promises = coins.map((coin) =>
      fetch(`${API_URL}/coins/${coin.id}/market_chart?vs_currency=usd&days=2`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": apiKey,
        },
      })
        .then((response) => response.json())
        .then((data) => data.market_caps as MarketCapData[])
    );

    Promise.all(promises)
      .then((results) => {
        setMarketCaps(results);
      })
      .catch((err) => console.error("Error fetching historical data:", err));
  };

  const formatMarketCapsData = () => {
    if (marketCaps.length === 0 || topCoins.length === 0)
      return { categories: [], series: [] };

    const timestamps = marketCaps[0].map((cap) => new Date(cap[0]).getHours());
    const seriesData = marketCaps.map((caps, index) => ({
      name: topCoins[index]?.name || `Coin ${index + 1}`,
      data: caps.map((cap) => Math.round(cap[1] / 10000000000)),
    }));

    return { categories: timestamps, series: seriesData };
  };

  const formattedData = formatMarketCapsData();

  const options = {
    chart: {
      id: "market-cap-chart",
    },
    xaxis: {
      categories: formattedData.categories,
      title: {
        text: "Hour of the day",
      },
    },
    yaxis: {
      title: {
        text: "Market Cap (in Billion USD)",
      },
    },
  };

  const series = formattedData.series;

  return (
    <div className="flex items-start justify-between px-4 lg:px-20 text-white">
      <div className="w-full">
        <div id="chart" className="">
          {loading ? (
            <Skeleton className="w-full h-full rounded-full" />
          ) : (
            <Chart options={options} series={series} type="line" height={450} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCoins;