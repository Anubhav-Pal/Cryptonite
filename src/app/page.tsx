import { Navbar, HeroSection, NavbarSpace, HomeCoinGraph } from "@/components/index";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col bg-[#0B0B15] h-full w-full overflow-y-auto">
      <NavbarSpace />
      <Navbar />
      <HeroSection />
      <HomeCoinGraph/>
    </div>
  );
};

export default HomePage;
