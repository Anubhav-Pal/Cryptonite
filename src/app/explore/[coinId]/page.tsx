"use client";
import { apiOptions } from "@/utils";
import React, { useEffect } from "react";
import { API_URL } from "../../../../config";
import CoinGraph from "./coin-graph";

const CoinPage = ({
  params,
}: {
  params: {
    coinId: string;
  };
}) => {
  useEffect(() => {
    fetch(`${API_URL}/coins/${params.coinId}`, apiOptions)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, [params.coinId]);

  return (
    <div className="px-20">
      <div>
        <CoinGraph coinId={params.coinId} selectedOption="prices" />
      </div>
      <div>hey</div>
    </div>
  );
};

export default CoinPage;
