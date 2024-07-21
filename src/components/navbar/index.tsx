"use client";
import { IoSearch } from "react-icons/io5";
import { Avatar, Hamburger, Notification } from "../../../svg/index";
import { useEffect, useState } from "react";
import { navItem } from "./types";
import Link from "next/link";
import { apiOptions } from "@/utils";
import { API_URL } from "../../../config";
import Loader from "../Loader";

const Navbar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [queryArray, setQueryArray] = useState<{ id: string; name: string }[]>(
    []
  );
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/search?query=${query}`, apiOptions)
      .then((response) => response.json())
      .then((response) => {
        setQueryArray(response.coins);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [query]);

  const handleQueryInputChange = (e) => {
    setOpenPopup(true);
    const { value } = e.target;
    setQuery(value);
  };
  const navItems: navItem[] = [
    {
      key: 1,
      label: "Home",
      value: "home",
      route: "/",
    },
    {
      key: 2,
      label: "Explore",
      value: "explore",
      route: "/explore",
    },
  ];
  return (
    <div className="w-full fixed flex bg-[#0B0B15]  shadow-purple-900 shadow-sm z-20 items-center justify-between px-20 p-5">
      <div className="flex flex-row items-center justify-start gap-3">
        <Link href="/" className="text-2xl font-bold uppercase purple_gradient">
          cryptonite
        </Link>
      </div>
      <div className="flex items-center justify-between gap-5 ">
        {navItems.map((navItem) => (
          <Link href={navItem.route} className="" key={navItem.key}>
            <div className="text-white font opacity-70 hover:opacity-90 transition-all cursor-pointer">
              {navItem.label}
            </div>
          </Link>
        ))}
        <div className="relative flex items-center justify-between bg-purple-50 ml-5 rounded-md">
          <input
            value={query}
            onChange={handleQueryInputChange}
            className="rounded-l-md font-normal placeholder:text-black outline-none bg-purple-50 p-2 pl-4 text-sm focus:ring-4 focus:ring-purple-300"
            type="text"
            placeholder="Search..."
          />
          <div className="h-full p-3">
            <IoSearch />
          </div>
          <div
            className={`${queryArray.length === 0 ? "hidden" : "absolute"} ${
              !openPopup && "hidden"
            } h-40 overflow-y-auto overflow-x-hidden w-52 top-12 bg-white flex flex-col`}
          >
            {loading ? (
              <Loader />
            ) : (
              queryArray.map((coin, index) => {
                return (
                  <Link
                    onClick={() => setOpenPopup(false)}
                    className="p-2 text-gray-500 font-medium cursor-pointer text-wrap hover:bg-gray-300 transition-all"
                    href={`/explore/${coin?.id}`}
                    key={index}
                  >
                    {coin.name}
                  </Link>
                );
              })
            )}
          </div>
        </div>
        <div className="w-6 sm:hidden opacity-60 hover:opacity-100">
          <Hamburger />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
