import React from "react";

const Planes = () => {
  return (
    <section
      id="planes"
      className="bg-radial-gradient-cyan w-full h-[800px] pb-20 flex flex-col items-center justify-center space-y-10 mt-28"
    >
      <h1 className="text-6xl font-bold text-center text-white mb-4 ">
        Planes
      </h1>
      <div className="w-full h-[1800px] md:h-[600px] flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 text-zinc-400">
        <div className="w-full md:w-1/3 h-full md:h-auto p-4 border-2 border-white flex flex-col items-center justify-evenly rounded-lg shadow-xl shadow-cyan-500/70 tracking-wide cursor-pointer hover:shadow-purple-500/40 duration-300 hover:text-white">
          <header className="font-bold text-3xl mb-2">Principiante</header>
          <div className="font-semibold text-4xl">€19/mes</div>
          <ul className="mt-4 space-y-2 text-left">
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 1
            </li>
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 2
            </li>
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 3
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 h-full md:h-auto p-4 border-2 border-white flex flex-col items-center justify-evenly rounded-lg shadow-xl shadow-cyan-500/70 tracking-wide cursor-pointer hover:shadow-purple-500/40 duration-300 hover:text-white">
          <header className="font-bold text-3xl mb-2">Pro</header>
          <div className="font-semibold text-4xl">€39/mes</div>
          <ul className="mt-4 space-y-2 text-left">
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 1
            </li>
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 2
            </li>
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 3
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 h-full md:h-auto p-4 border-2 border-white flex flex-col items-center justify-evenly rounded-lg shadow-xl shadow-cyan-500/70 tracking-wide cursor-pointer hover:shadow-purple-500/40 duration-300 hover:text-white">
          <header className="font-bold text-3xl mb-2">Empresas</header>
          <div className="font-semibold text-4xl">Custom</div>
          <ul className="mt-4 space-y-2 text-left">
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 1
            </li>
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 2
            </li>
            <li className="flex items-center">
              <span className="icon mr-2">🏷️</span>
              Característica 3
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Planes;
