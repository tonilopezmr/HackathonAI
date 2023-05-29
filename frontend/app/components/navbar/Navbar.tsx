"use client";
import React from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <div className="w-full mx-auto flex justify-between items-center sticky top-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6">
      <div className="cursor-pointer">
        <Link
          activeClass="text-purple-600"
          to="inicio"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <img src="../Logo.png" alt="SmartTool" width="70px" />
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-10">
          <li className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-cyan-500 duration-300">
            <Link
              activeClass="text-purple-600"
              to="inicio"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Inicio
            </Link>
          </li>
          <li className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-cyan-500 duration-300">
            <Link
              activeClass="text-purple-600"
              to="casos"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Casos de uso
            </Link>
          </li>
          <li className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-cyan-500 duration-300">
            <Link
              activeClass="text-purple-600"
              to="planes"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Planes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
