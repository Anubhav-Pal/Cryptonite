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
          <TopCoins />
        </div>
        <div className="w-full flex justify-center gap-5">
          <div className="w-1/2">
            <TrendingTable />
          </div>
          <div className="w-1/2">
            <PublicHoldingTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
