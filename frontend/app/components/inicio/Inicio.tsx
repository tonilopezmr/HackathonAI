import React from "react";

const Inicio = () => {
  return (
    <section
      id="inicio"
      className="bg-radial-gradient-cyan w-full h-[800px] pb-20 flex items-center justify-center min-h-screen"
    >
      <div className="bg-radial-gradient-white md:bg-radial-gradient-white-md flex flex-col md:flex-row items-center justify-around">
        <div className="w-full md:w-1/2 text-center mx-4 ">
          <h1 className="text-6xl font-bold text-white mb-4 ">
            ¡Bienvenido a nuestra
          </h1>
          <h1 className="text-6xl font-bold text-white mb-4 ">IA!</h1>
          <h2 className="text-3xl text-cyan-700 mb-8">
            Resolvemos cualquier caso de uso a través de la inteligencia
            artificial
          </h2>
        </div>
        <div className="mx-4">
          <img
            className="object-cover mx-auto md:mx-0 mb-10"
            src="../demopanel.png"
            alt="Imagen de IA"
            width="400px"
          />
          <img
            className="object-cover ml-20"
            src="../Mano.png"
            alt="Imagen de IA"
            width="300px"
          />
        </div>
      </div>
    </section>
  );
};

export default Inicio;
