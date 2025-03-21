'use client';

import ConnectPage from '../../api/ConnectPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function queryPdfs() {
  return (
    <main>
      <div className='p-8 md:w-10/12 md:mx-auto text-center'>
        <div className='text-white'>{/* <ConnectPage /> */}</div>
        <h1 className='text-4xl mt-12 font-bold text-zinc-100'>
          Preguntar acerca de un PDF
        </h1>
        <form className='mt-10 w-full md:10/12 xl:w-6/12 max-h-80 mx-auto grid grid-cols-1 justify-start'>
          <input
            placeholder='nombre-del-archivo.pdf'
            className='md:w-5/12 bg-transparent border-2 rounded-lg border-zinc-100 text-zinc-400 p-3 shadow-lg shadow-cyan-500/70 focus:shadow-purple-500/40 duration-300 focus:outline-none'
          ></input>
          <div className='relative flex justify-center mt-10'>
            <textarea
              placeholder='¿Sobre qué trata este documento?'
              className='w-full pe-24 bg-transparent border-2 rounded-lg border-zinc-100 text-zinc-400 p-6 shadow-lg shadow-cyan-500/70 focus:shadow-purple-500/40 duration-300 focus:outline-none'
            ></textarea>
            <button className='absolute top-5 right-5 text-white font-bold ms-8'>
              <FontAwesomeIcon
                icon={faPaperPlane}
                className='text-zinc-100 w-5 h-5'
              />
            </button>
          </div>
          <p className='mt-4 text-left text-zinc-300'>
            ¿Aún no has subido el documento?{' '}
            <span className='text-purple-400 cursor-pointer'>
              Subir documento
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}
