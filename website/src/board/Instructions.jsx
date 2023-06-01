import { Button } from '@/landing/Button'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image'

const getInstructions = async () => {
  const jwt = localStorage.getItem("token");

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructions`, {      
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${jwt}`
      },      
    })
    .then((res) => res.json())
    .then((data) => {      
      console.log(data)        
      return data
    })
}


const onUseCaseClick = (instruction) => {    
  if(instruction.name.includes("write-blog-post")) {
    return "/write_blog_post"
  } else if (instruction.name.includes("pdfs")) {
    return "/pdfs"
  } else if (instruction.name.includes("translate")) {
    return "/translator"
  } else if (instruction.name.includes("generate_images")) {
    return "/generate_images"
  } else {
    return "/dashboard"
  }
}

export default function Instructions() {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    getInstructions().then((data) => {
      if(data.data) {
        setInstructions(data.data.map(ins => ins.attributes))
      }
    })
  }, []);

  if(instructions.length === 0) {
    return <div className='font-bold text-xl text-white'>Loading...</div>
  }

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {instructions.map((instruction) => (
        <li
          key={instruction.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-20 w-20 flex-shrink-0 rounded-full" src={instruction.thumbnail} alt="" />
            <h3 className="mt-6 text-xl font-bold text-gray-900">{instruction.title}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">              
              <dd className="text-sm text-gray-500">{instruction.description}</dd>              
              <dd className="mt-3">
                {instruction.name === "generate_images" | instruction.name === "translate" ? (<span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                  No disponible...
                </span>) : null}                
              </dd>
            </dl>
            <Link href={onUseCaseClick(instruction)} className="group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white border-slate-400 border text-slate-900 hover:bg-indigo-50 active:bg-indigo-200 active:text-slate-600 focus-visible:outline-white mt-10" >
              Done
            </Link>
          </div>          
        </li>
      ))}
    </ul>
  )
}
