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
  const [option, setOption] = useState<string>(selectedOption);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=2`,
      apiOptions
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data);

        setMarketCap(
          data.market_caps.map(
            ([time, value]: [time: string, value: string]) => ({ time, value })
          )
        );
        setPrices(
          data.prices.map(([time, value]: [time: string, value: string]) => ({
            time,
            value,
          }))
        );
        setVolumes(
          data.total_volumes.map(
            ([time, value]: [time: string, value: string]) => ({ time, value })
          )
        );
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [coinId]);
    
  useEffect(() => {
    if (option === "prices") {
      setSelectedData(prices);
    } else if (option === "market_cap") {
      setSelectedData(marketCap);
    } else {
      setSelectedData(volumes);
    }
  }, [option, marketCap, prices, volumes]);
    
  const formatMarketCapsData = () => {
    if (selectedData.length === 0) return { categories: [], series: [] };

    const timestamps = selectedData.map((cap) => new Date(cap.time).getHours());
    const Data = selectedData.map((cap) => Math.round(cap.value / 1000000000)); // Convert to billions

    return {
      categories: timestamps,
      series: [{ name: "Market Cap", data: Data }],
    };
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
        // text: "Market Cap (in Billion USD)",
      },
    },
  };

  const series = formattedData.series;

  return (
    <div className="flex items-start justify-between px-20">
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
