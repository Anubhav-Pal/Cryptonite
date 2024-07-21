import React from "react";
import HeroSection from "./hero-section";
import TopCoins from "./top-coins";
import TrendingTable from "./trending-coins";
import PublicHoldingTable from "./public-holdings";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <div className="px-20">
        <div className="my-40">
          <div className="text-white text-2xl font-semibold text-center capitalize">
            Current Top Coins
          </div>
          <TopCoins />
        </div>
        <div className="w-full flex justify-center gap-5 h-screen">
          <div className="w-1/2">
            <div className="text-white font-xl font-bold my-5">
              Trending In Market
            </div>
            <TrendingTable />
          </div>
          <div className="w-1/2">
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
