import { Navbar, HeroSection, NavbarSpace } from "@/components/index";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col bg-[#0B0B15] h-full w-full overflow-y-auto">
      {/* <NavbarSpace /> */}
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HomePage;
