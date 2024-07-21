"use client";
import { apiOptions } from "@/utils";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../config";
import CoinGraph from "./coin-graph";
import Image from "next/image";

type current_price = {
  aed: number;
  ars: number;
  aud: number;
  bch: number;
  bdt: number;
  bhd: number;
  bmd: number;
  bnb: number;
  brl: number;
  btc: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  dot: number;
  eos: number;
  eth: number;
  eur: number;
  gbp: number;
  gel: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  ltc: number;
  mmk: number;
  mxn: number;
  myr: number;
  ngn: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  usd: number;
  vef: number;
  vnd: number;
  xag: number;
  xau: number;
  xdr: number;
  xlm: number;
  xrp: number;
  yfi: number;
  zar: number;
  bits: number;
  link: number;
  sats: number;
};
type coinData = {
  id: string;
  symbol: string;
  name: string;
  categories: string[];
  description: { [key: string]: string };
  image: { [key: string]: string };
  market_cap_rank: number;
  market_data: {
    current_price: current_price;
    total_volume: current_price;
    market_cap: current_price;
    low_24h: current_price;
    high_24h: current_price;
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: Date;
  };
};

const CoinPage = ({
  params,
}: {
  params: {
    coinId: string;
  };
}) => {
  const [graphLabel, setGraphLabel] = useState<string>("market_cap");
  const [coinData, setCoinData] = useState<coinData>();
  const [graphHeader, setGraphHeader] = useState<string>("Total Market cap");
  const [graphHeaderData, setGraphHeaderData] = useState<number | undefined>();
  const [prices, setPrices] = useState<number>();
  const [volume, setVolume] = useState<number>();
  const [marketCap, setMarketCap] = useState<number>();
  const [categories, setCategories] = useState<string[]>();
  const [coinImage, setcoinImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>();

  useEffect(() => {
    fetch(`${API_URL}/coins/${params.coinId}`, apiOptions)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  }, [params.coinId]);

  useEffect(() => {
    if (coinData) {
      setPrices(coinData.market_data.current_price.usd);
      setVolume(coinData.market_data.total_volume.usd);
      setMarketCap(coinData.market_data.market_cap.usd);
      setCategories(coinData.categories);
      setcoinImage(coinData.image["large"] || "");
      setDescription(coinData.description["en"] || "");
      setLastUpdated(formatDate(coinData.market_data.last_updated));

      // Set graphHeaderData based on the current graphLabel
      if (graphLabel === "market_cap") {
        setGraphHeader("Current Market Cap");
        setGraphHeaderData(coinData.market_data.market_cap.usd);
      } else if (graphLabel === "prices") {
        setGraphHeader("Current Price");
        setGraphHeaderData(coinData.market_data.current_price.usd);
      } else if (graphLabel === "volumes") {
        setGraphHeader("Current Volume");
        setGraphHeaderData(coinData.market_data.total_volume.usd);
      }
    }
  }, [coinData, graphLabel]);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = String(date.getFullYear()).slice(-2); // get the last two digits of the year
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="px-20 flex flex-row gap-3 items-start justify-start mb-24">
      <div className=" flex flex-col gap-10 w-2/3">
        <div className="flex flex-col items-center w-full">
          <div className="w-full text-white flex flex-col mt-6">
            <div className="flex items-center gap-2 mb-6">
              <Image src={coinImage} alt="coin_image" width={60} height={60} />
              <h1 className="text-4xl font-semibold uppercase">
                {coinData?.name}
              </h1>
              <div className="inline-flex w-fit items-center px-3 py-1 bg-green-100 border-2 border-green-400 text-green-800 text-sm font-semibold rounded-full shadow-sm">
                Rank {coinData?.market_cap_rank}
              </div>
            </div>

            <div>
              <div className="text-2xl font-medium capitalize">
                {graphHeader}
              </div>
              <div className="font-semibold">{graphHeaderData}</div>
            </div>
          </div>
          <CoinGraph coinId={params.coinId} selectedOption={graphLabel} />
          <div className="flex mt-5 font-normal text-white rounded-full bg-gray-800 gap-1 w-1/2 p-1 items-center justify-between">
            <div
              onClick={() => setGraphLabel("prices")}
              className={`text-sm p-1 rounded-full w-1/2 ${
                graphLabel === "prices" ? "bg-gray-900" : ""
              } text-center cursor-pointer`}
            >
              Price
            </div>
            <div
              onClick={() => setGraphLabel("market_cap")}
              className={`text-sm p-1 px-2 rounded-full w-1/2 ${
                graphLabel === "market_cap" ? "bg-gray-900" : ""
              } text-center cursor-pointer`}
            >
              Market Cap
            </div>
            <div
              onClick={() => setGraphLabel("volumes")}
              className={`text-sm p-1 rounded-full w-1/2 ${
                graphLabel === "volumes" ? "bg-gray-900" : ""
              } text-center cursor-pointer`}
            >
              Volume
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-white">Category</div>
          <div className="flex  w-full flex-wrap gap-1">
            {categories?.map((category, id) => (
              <div
                key={id}
                className="inline-flex w-fit text-xs items-center px-3 py-1 bg-green-100 border-2 border-green-400 text-green-800 font-semibold rounded-full shadow-sm"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-white">Description</div>
          <div className="flex  w-full flex-wrap gap-1 text-gray-300 font-medium">
            {description}
          </div>
        </div>
      </div>

      <div className="mt-6 w-1/3 flex flex-col gap-10">
        <div className="text-white">
          <div className="text-sm font-semibold ">Performance</div>
          <div className="my-5">
            <div className="text-2xl font-semibold mb-2">last 24 hours</div>
            <div>
              <div className="text-md font-medium text-gray-300">
                <span className="text-white">Lowest:</span>{" "}
                {coinData?.market_data?.low_24h["usd"]} 🔴
              </div>
              <div className="text-md font-medium text-gray-300">
                <span className="text-white">Highest:</span>{" "}
                {coinData?.market_data?.high_24h["usd"]} 🟢{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="text-white">
          <div className="text-sm font-semibold ">Fundamentals</div>
          <div className="my-5 flex flex-col gap-2">
            <div className="border-b-2 border-white flex items-end justify-between border-opacity-40 p-1 pt-2">
              <div className="capitalize text-sm">total supply</div>
              <div className="font-semibold text-lg">
                {coinData?.market_data.total_supply}
              </div>
            </div>
            <div className="border-b-2 border-white flex items-end justify-between border-opacity-40 p-1 pt-2">
              <div className="capitalize text-sm">circulatiing supply</div>
              <div className="font-semibold text-lg">
                {coinData?.market_data.circulating_supply}
              </div>
            </div>
            <div className="border-b-2 border-white flex items-end justify-between border-opacity-40 p-1 pt-2">
              <div className="capitalize text-sm">max supply</div>
              <div className="font-semibold text-lg">
                {coinData?.market_data.max_supply ||
                  coinData?.market_data.total_supply}
              </div>
            </div>
            <div className="border-b-2 border-white flex items-end justify-between border-opacity-40 p-1 pt-2">
              <div className="capitalize text-sm">last updated</div>
              <div className="font-semibold text-lg">{lastUpdated}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
