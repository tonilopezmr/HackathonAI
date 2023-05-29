"use client";
import React from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <div className="w-full h-20 mx-auto flex justify-between items-center sticky top-0 bg-slate-900">
      <div>
        <img src="" alt="SmartTool" />
      </div>
      <div>
        <ul className="flex items-center gap-10">
          <li className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-cyan-500 duration-300">
            <Link
              activeClass="text-cyan-500"
              to="intro"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Home
            </Link>
          </li>
          <li className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-cyan-500 duration-300">
            <Link
              activeClass="text-cyan-500"
              to="features"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Features
            </Link>
          </li>
          <li className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-cyan-500 duration-300">
            <Link
              activeClass="text-cyan-500"
              to="pricing"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Pricing
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
