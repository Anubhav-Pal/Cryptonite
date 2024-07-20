import React from "react";
import heroLeft from "../../../../public/assets/images/hero-section/hero-left.png";
import heroRight from "../../../../public/assets/images/hero-section/hero-right.png";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="text-white h-[90vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center text-center w-3/5">
        <div className="text-lg font-medium">Explore top coins</div>
      </div>
    </div>
  );
};

export default HeroSection;
