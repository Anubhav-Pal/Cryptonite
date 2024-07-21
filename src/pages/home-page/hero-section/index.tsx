import React from "react";
import heroLeft from "../../../../public/assets/images/hero-section/hero-left.png";
import heroRight from "../../../../public/assets/images/hero-section/hero-right.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="text-white h-[90vh] w-full flex items-center justify-between">
      <div className="h-full flex items-end">
        <Image
          src={heroLeft}
          width={400}
          className="opacity-30 hidden sm:block"
          alt="crypto-left"
        />
      </div>
      <div className="flex flex-col items-center text-center w-full px-6 sm:px-0 lg:w-3/5">
        <div className="text-xs sm:text-sm font-medium sm:mt-0 mt-10 w-full">
          Whether you’re a hodler or a trader, Cryptonite has got what you need.
        </div>
        <div className=" mt-5 sm:text-5xl font-extrabold leading-[1.15] text-white text-4xl">
          The <span className="purple_gradient">best crypto tracker </span>
          for Bitcoin & altcoins
        </div>
        <div className=" my-3 text-xs sm:text-sm opacity-60 font-normal sm:font-semibold">
          Cryptonite tracks Bitcoin, Ethereum, Litecoin, and 10,000+ altcoins
          Use our web app to monitor your portfolio across exchanges and get the
          latest prices and market charts in your local currency.
        </div>
        <Link
          href="/explore"
          className="w-full flex items-center justify-center mt-4"
        >
          <Button className="purple_btn font-bold w-2/3 lg:w-1/4 ">
            Explore
          </Button>
        </Link>
      </div>
      <div className="h-full flex items-start">
        <Image
          src={heroRight}
          width={400}
          className="opacity-30 hidden sm:block"
          alt="crypto-right"
        />
      </div>
    </div>
  );
};

export default HeroSection;
