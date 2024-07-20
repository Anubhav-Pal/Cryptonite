"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { API_URL } from "../../../../config";
import { apiKey, apiOptions } from "@/utils";
import { DataTable } from "@/components/data-table/data-table";
import Loader from "@/components/Loader";
import SelectComponent from "@/components/select";

export default function ExploreCoinsTable() {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState<number | string>("usd");
  const [coinsPerPage, setCoinsPerPage] = useState<number | string>(20);
  const [pageNumber, setPageNumber] = useState<number | string>(1);
  const [priceChangeTimeframe, setPriceChangeTimeframe] = useState<
    number | string
  >("1h");
  const [loading, setLoading] = useState<boolean>(true);

  const filters = [
    {
      label: "Coins Per Page",
      placeholder: "Select",
      func: setCoinsPerPage,
      options: [
        { value: 10, label: 10 },
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
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 50, label: 50 },
        { value: 100, label: 100 },
      ],
    },
    {
      label: "Page",
      placeholder: "Select",
      func: setPageNumber,
      options: [
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 50, label: 50 },
        { value: 100, label: 100 },
      ],
    },
    {
      label: "Time frame",
      placeholder: "Select",
      func: setPriceChangeTimeframe,
      options: [
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 50, label: 50 },
        { value: 100, label: 100 },
      ],
    },
  ];
  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}/coins/markets?vs_currency=${currency}&per_page=${coinsPerPage}&page=${pageNumber}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&precision=2`,
      apiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        setCoins(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [currency, coinsPerPage, pageNumber]);

  const data = coins.map((coin) => {
    const {
      id,
      symbol,
      name,
      image,
      current_price,
      market_cap,
      price_change_percentage_24h,
    } = coin;
    const coinData = {
      id,
      symbol,
      name,
      image,
      current_price,
      market_cap,
      price_change_percentage_24h,
    };
    return coinData;
  });

  return (
    <div className="overflow-auto px-20 flex flex-col gap-10 my-10">
      {/* <div className="text-white font-xl font-bold my-5">Coins</div> */}
      <div className="text-white flex items-center gap-4 w-full">
        {filters.map(({ label, func, placeholder, options }, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <div>{label}:</div>
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
        {loading ? <Loader /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
