"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { API_URL } from "../../../../config";
import { apiKey, apiOptions } from "@/utils";
import { DataTable } from "@/components/data-table/data-table";
import Loader from "@/components/Loader";
import SelectComponent from "@/components/select";
import { Input } from "@/components/ui/input";

export default function ExploreCoinsTable() {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState<number | string>("usd");
  const [coinsPerPage, setCoinsPerPage] = useState<number | string>(20);
  const [pageNumber, setPageNumber] = useState<number | string>(1);
  const [priceChangeTimeframe, setPriceChangeTimeframe] = useState<
    number | string
  >("1h");
  const [loading, setLoading] = useState<boolean>(true);

  const timeframePropertyMapping: { [key: string]: string } = {
    "1h": "price_change_percentage_1h_in_currency",
    "24h": "price_change_percentage_24h_in_currency",
    "7d": "price_change_percentage_7d_in_currency",
  };

  const filters = [
    {
      label: "Coins Per Page",
      placeholder: "Select",
      func: setCoinsPerPage,
      options: [
        { value: 20, label: 20 },
        { value: 50, label: 50 },
        { value: 100, label: 100 },
      ],
    },
    {
      label: "Currency",
      placeholder: "Select",
      func: setCurrency,
      options: [
        { value: "usd", label: "USD" },
        { value: "inr", label: "INR" },
        { value: "eur", label: "EUR" },
        { value: "aud", label: "AUD" },
        { value: "cad", label: "CAD" },
        { value: "hkd", label: "HKD" },
      ],
    },
    {
      label: "Percentage Change From",
      placeholder: "Select",
      func: setPriceChangeTimeframe,
      options: [
        { value: "1h", label: "last hour" },
        { value: "24h", label: "last day" },
        { value: "7d", label: "last week" },
      ],
    },
  ];
  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}/coins/markets?vs_currency=${currency}&per_page=${coinsPerPage}&page=${pageNumber}&sparkline=false&price_change_percentage=${priceChangeTimeframe}&precision=2`,
      apiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        setCoins(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [currency, coinsPerPage, pageNumber, priceChangeTimeframe]);

  const data = coins.map((coin) => {
    const { id, symbol, name, image, current_price, market_cap } = coin;

    const priceChangeProperty = timeframePropertyMapping[priceChangeTimeframe];

    const coinData = {
      id,
      symbol,
      name,
      image,
      current_price,
      market_cap,
      price_change_percentage: parseFloat(coin[priceChangeProperty]).toFixed(2),
    };
    return coinData;
  });

  return (
    <div className="overflow-auto px-20 flex flex-col gap-10 my-10">
      <div className="text-white text-3xl font-semibold my-2 capitalize">
        Explore 12000+ coins on cryptonite
      </div>
      <div className="flex items-center gap-4 w-full p-2">
        {filters.map(({ label, func, placeholder, options }, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <div className="text-white">{label}:</div>
              <SelectComponent
                placeholder={placeholder}
                onValueChange={func}
                options={options}
              />
            </div>
          );
        })}
      </div>
      <div className="">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
      <div className="flex items-center justify-between w-full text-white p-2">
        <div className="text-white flex items-center justify-start gap-10">
          <button
            className={`${
              pageNumber === 1
                ? "disabled opacity-30 p-2 text-gray-50 rounded-lg"
                : "purple_btn"
            }`}
            onClick={() => setPageNumber((prev) => Number(prev) - 1)}
            disabled={pageNumber === 1 ? true : false}
          >
            previous
          </button>
          <button
            className="purple_btn"
            onClick={() => setPageNumber((prev) => Number(prev) + 1)}
          >
            next
          </button>
        </div>
        <div className="flex items-center">
          <label htmlFor="" className="text-sm font-semibold flex-nowrap">
            Page number:{" "}
          </label>
          <Input
            className="text-black"
            type="number"
            onChange={(e) => setPageNumber(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
