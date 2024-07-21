"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { API_URL } from "../../../../config";
import { apiKey } from "@/utils";
import Loader from "@/components/Loader";
import { DataTable } from "@/components/data-table/data-table";

export default function PublicHoldingTable() {
  const [marketHolding, setMarketHolding] = useState([]);
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
        setMarketHolding(response.companies);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [currentCoin]);

  const data = marketHolding.map((company) => {
    const { name, symbol, total_holdings, total_current_value_usd } = company;
    const companyData = {
      name,
      symbol,
      total_holdings,
      value: total_current_value_usd,
    };
    return companyData;
  });

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
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
