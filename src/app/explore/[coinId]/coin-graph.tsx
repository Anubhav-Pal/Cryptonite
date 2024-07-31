"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { API_URL } from "../../../../config";
import { Skeleton } from "@/components/ui/skeleton";
import { apiOptions } from "@/utils";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  coinId: string;
  selectedOption: string;
};

interface coinTimeData {
  time: number;
  value: number;
}
type coinDataArrayType = coinTimeData[];

const CoinGraph: React.FC<Props> = ({ coinId, selectedOption }) => {
  const [marketCap, setMarketCap] = useState<coinDataArrayType>([]);
  const [prices, setPrices] = useState<coinDataArrayType>([]);
  const [volumes, setVolumes] = useState<coinDataArrayType>([]);
  const [selectedData, setSelectedData] = useState<coinDataArrayType>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=2`,
      apiOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setMarketCap(
            data.market_caps.map(([time, value]: [number, number]) => ({
              time,
              value,
            }))
          );
          setPrices(
            data.prices.map(([time, value]: [number, number]) => ({
              time,
              value,
            }))
          );
          setVolumes(
            data.total_volumes.map(([time, value]: [number, number]) => ({
              time,
              value,
            }))
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [coinId]);

  useEffect(() => {
    if (selectedOption === "prices") {
      setSelectedData(prices);
    } else if (selectedOption === "market_cap") {
      setSelectedData(marketCap);
    } else if (selectedOption === "total_volumes") {
      setSelectedData(volumes);
    }
  }, [selectedOption, marketCap, prices, volumes]);

  const formatMarketCapsData = () => {
    if (selectedData.length === 0) return { categories: [], series: [] };

    // Determine if data should be in billions (marketCap, volumes) or dollars (prices)
    const isBillions =
      selectedOption === "market_cap" || selectedOption === "volumes";

    const timestamps = selectedData.map((cap) => new Date(cap.time).getHours());
    const data = selectedData.map((cap) => {
      return isBillions
        ? Math.round(cap.value / 1_000_000_000) // Convert to billions
        : Math.round(cap.value); // Keep in dollars for prices
    });

    return {
      categories: timestamps,
      series: [{ name: selectedOption === "prices" ? "Price" : "Value", data }],
    };
  };

  const formattedData = formatMarketCapsData();

  const options = {
    chart: {
      id: "data-chart",
    },
    xaxis: {
      categories: formattedData.categories,
      title: {
        text: "Hour of the Day",
      },
    },
    yaxis: {
      title: {
        text:
          selectedOption === "prices" ? "Price (USD)" : "Value (Billions USD)",
      },
    },
  };

  const series = formattedData.series;

  return (
    <div className="flex items-start justify-between w-full">
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

export default CoinGraph;
