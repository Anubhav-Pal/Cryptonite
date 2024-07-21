import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { API_URL } from "../../../../config";
import { Skeleton } from "@/components/ui/skeleton";
import { apiOptions } from "@/utils";

type Props = {
  coinId: string;
  selectedOption: string;
};

interface MarketCaps {
  time: number;
  value: number;
}

const CoinGraph: React.FC<Props> = ({ coinId, selectedOption }) => {
  const [marketCap, setMarketCap] = useState<MarketCaps[]>([]);
  const [prices, setPrices] = useState<MarketCaps[]>([]);
  const [volumes, setVolumes] = useState<MarketCaps[]>([]);
  const [selectedData, setSelectedData] = useState<MarketCaps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=2`,
      apiOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setMarketCap(
          data.market_caps.map(([time, value]: [string, string]) => ({
            time,
            value: parseFloat(value),
          }))
        );
        setPrices(
          data.prices.map(([time, value]: [string, string]) => ({
            time,
            value: parseFloat(value),
          }))
        );
        setVolumes(
          data.total_volumes.map(([time, value]: [string, string]) => ({
            time,
            value: parseFloat(value),
          }))
        );
        setLoading(false);
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
    } else {
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
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={450}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinGraph;
