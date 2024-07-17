import React from "react";

const HeroSection = () => {
  return (
    <div className="text-white h-screen w-full px-10 flex items-center justify-between">
      <div>image</div>
      <div className="flex flex-col text-center w-3/5">
        <div className="text-sm font-medium">
          Whether you’re a hodler or a trader, Cryptonite got what you need.
        </div>
        <div className="head_text text-white">
          The <span className="purple_gradient ">best crypto tracker </span>
          for Bitcoin & altcoins
        </div>
        <div className="">
          Cryptonite is your go-to crypto tracker, covering Bitcoin, Ethereum,
          Litecoin, and over 10,000 altcoins. Use our web app to monitor your
          portfolio across exchanges and get the latest prices and market charts
          in your local currency.
        </div>
        <div className="desc">Become a better investor</div>
      </div>
      <div>image</div>
    </div>
  );
};

export default HeroSection;
