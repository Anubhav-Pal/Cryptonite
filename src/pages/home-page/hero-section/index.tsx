import React from "react";
import heroLeft from "../../../../public/assets/images/hero-section/hero-left.png";
import heroRight from "../../../../public/assets/images/hero-section/hero-right.png";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="text-white h-[90vh] w-full flex items-center justify-between">
      <div className="h-full flex items-end">
        <Image
          src={heroLeft}
          width={400}
          className="opacity-30"
          alt="crypto-left"
        />
      </div>
      <div className="flex flex-col items-center text-center w-3/5">
        <div className="text-sm font-medium">
          Whether you’re a hodler or a trader, Cryptonite has got what you need.
        </div>
        <div className="head_text text-white">
          The <span className="purple_gradient ">best crypto tracker </span>
          for Bitcoin & altcoins
        </div>
        <div className=" my-3 text-sm opacity-60 font-semibold">
          Cryptonite tracks Bitcoin, Ethereum, Litecoin, and 10,000+ altcoins
          Use our web app to monitor your portfolio across exchanges and get the
          latest prices and market charts in your local currency.
        </div>
        <Link
          href="/explore"
          className="w-full flex items-center justify-center mt-4"
        >
          <button className="purple_btn font-bold  w-1/4 ">Explore</button>
        </Link>
      </div>
      <div className="h-full flex items-start">
        <Image
          src={heroRight}
          width={400}
          className="opacity-30"
          alt="crypto-right"
        />
      </div>
    </div>
  );
};

export default HeroSection;
