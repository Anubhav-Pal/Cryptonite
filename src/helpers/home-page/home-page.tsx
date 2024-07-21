"use client";

import React from "react";
import HeroSection from "./hero-section";
import TopCoins from "./top-coins";
import TrendingTable from "./trending-coins";
import PublicHoldingTable from "./public-holdings";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <div className="px-5 sm:px-20 pb-20 ">
        <div className="h-screen lg:h-full">
          <div className="text-white text-xl lg:text-2xl font-semibold text-center capitalize">
            Current Top Coins
          </div>
          <TopCoins />
        </div>
        <div className="mt-80 md:mt-96 mb-20 lg:mt-10 w-full flex lg:flex-row flex-col justify-center gap-5 h-screen">
          <div className=" w-full lg:w-1/2">
            <div className="text-white font-xl font-bold my-5">
              Trending In Market
            </div>
            <TrendingTable />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="text-white font-xl font-bold my-5">
              Top Public Holdings
            </div>
            <div className="h-40rem overflow-auto">
              <PublicHoldingTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
