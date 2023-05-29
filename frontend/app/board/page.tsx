import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import data from './data';
import { cardData } from './data';

function Card({ data }: { data: cardData }) {
  return (
    <button className='flex w-full flex-col bg-clip-border rounded-xl border-2 border-zinc-100 text-zinc-400 hover:text-zinc-100 p-6 shadow-lg hover:border-white shadow-cyan-500/70 hover:shadow-purple-500/40 duration-300'>
      <div className='mx-auto'>
        <img src={data.thumbnail} className='w-10 h-10' />
      </div>
      <h3 className='mt-6 text-2xl'>{data.title}</h3>
      <p className='text-slate-500 h-16 mb-4'>{data.description}</p>
    </button>
  );
}

export default function Board() {
  return (
    <main className='min-h-screen bg-slate-900'>
      <div className='p-8 md:w-10/12 md:mx-auto text-center'>
        <h1 className='text-4xl mt-12 font-bold text-zinc-100'>
          BOARD - Cartas
        </h1>
        <div className='mt-12 mb-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 '>
          {data.map((card) => (
            <Card data={card} />
          ))}
          <button className='flex w-full flex-col bg-clip-border rounded-xl border-2 border-zinc-500 hover:border-zinc-100 text-zinc-400 hover:text-zinc-100 p-6 shadow-lg duration-300'>
            <div className='mt-10 mx-auto'>
              <FontAwesomeIcon icon={faPlus} className='w-10 h-10' />
            </div>
            <h3 className='mt-4 text-2xl h-20'>Add use state</h3>
          </button>
        </div>
      </div>
    </main>
  );
}
