"use client";
import { IoSearch } from "react-icons/io5";
import { Avatar, Hamburger, Notification } from "../../../svg/index";
import { useState } from "react";
import { navItem } from "./types";
import Link from "next/link";

const Navbar: React.FC = () => {
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
    <div className="w-full fixed flex bg-transparent shadow-purple-900 shadow-sm z-20 items-center justify-between px-10 p-5">
      <div className="flex flex-row items-center justify-start gap-3">
        <Link href="/" className="text-white text-2xl font-bold uppercase">
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
        <div className="flex items-center justify-between bg-purple-50 ml-5 rounded-md">
          <div className="h-full p-3">
            <IoSearch />
          </div>
          <input
            className="rounded-r-md font-normal placeholder:text-black outline-none bg-purple-50 p-2 text-sm focus:ring-4 focus:ring-purple-300"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="w-6 sm:hidden opacity-60 hover:opacity-100">
          <Hamburger />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
