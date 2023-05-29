import React from "react";
import Navbar from "./components/navbar/Navbar";
import Inicio from "./components/inicio/Inicio";
import Planes from "./components/Planes/Planes";
import Casos from "./components/casos/Casos";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <div className="px-6 w-full h-auto bg-slate-900 text-white">
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <Inicio />
        <Casos />
        <Planes />
      </div>
      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
}
