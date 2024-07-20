import { Navbar, NavbarSpace } from "@/components/index";
import HomePage from "@/pages/home-page/home-page";
import React from "react";

const App = () => {
  return (
    <div className="flex flex-col bg-[#0B0B15] h-full w-full overflow-y-auto">
      <NavbarSpace />
      <Navbar />
      <HomePage />
    </div>
  );
};

export default App;
