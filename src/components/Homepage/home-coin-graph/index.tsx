"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

interface MarketCaps {
  time: number;
  value: number;
}

const HomeCoinGraph: React.FC = () => {
  const [topCoins, setTopCoins] = useState<Coin[]>([]);
  const [marketCaps, setMarketCaps] = useState<MarketCaps[][]>([]);

  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-mdwtM3hntyXN9TYWex3JpJus",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=3",
      apiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        setTopCoins(response || []);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(marketCaps);

  useEffect(() => {
    if (topCoins.length > 0) {
      getHistoricalData();
    }
  }, [topCoins]);

  const getHistoricalData = () => {
    const promises = topCoins.map((coin) =>
      fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=2`,
        apiOptions
      )
        .then((response) => response.json())
        .then((data) => data.market_caps)
    );

    Promise.all(promises)
      .then((results) => {
        setMarketCaps(results);
      })
      .catch((err) => console.error("Error fetching historical data:", err));
  };

  const formatMarketCapsData = () => {
    if (marketCaps.length === 0) return [];

    const timestamps = marketCaps[0].map((cap) => new Date(cap[0]).getHours());
    const seriesData = marketCaps.map((caps, index) => ({
      name: topCoins[index].name,
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
      categories: formattedData?.categories,
      title: {
        text: "Hour of the day",
      },
    },
    yaxis: {
      title: {
        text: "Market Cap (in Billions USD)", 
      },
    },
  };

  const series = formattedData.series || [];

  return (
    <div>
      <div id="chart" className="px-20">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={450}
        />
      </div>
    </div>
  );
};

export default HomeCoinGraph;
