import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header } from '@/board/Header'
import Instructions from '@/board/Instructions'
import { useEffect, useState } from 'react';

const blogPostStructure = (result) => {
  const paragraphs = result.blog_post.split("\n\n")
  
  /*
  return (
    <>   
      {result.blog_post}
      {result.images.map(image => <img src={image} width="500px"></img>)}
    </>
  )
  */
  return (
    <>    
    { paragraphs.map((paragraph, idx) => {
      const image = idx < result.images.length ? <img src={result.images[idx]} width="500px"></img> : ""      
      return (
        <>
          {paragraph + "\n\n"}
          {image}
          {"\n\n"}
        </>
      )
    })}
    </>
  )
}


export default function WriteBlogPost() {
  const [text, setText] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const [result, setResult] = useState(null);

  const writeBlog = (topic) => {    
    console.log(topic)
    setLoading(true)
    fetch(`https://smartpipes.bodia.ai/create_blog_post_with_images`, {
      method: "POST",    
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer amigos_hackathonianos"
      },
      body: JSON.stringify({ "blogpost": topic })
    })
    .then((res) => res.json())
    .then((data) => {   
      setLoading(false)         
      setResult(data)
      return data   
    })
  }

  return (
    <>  
      <div className="min-h-full">
        
        <Header title="Crea imagenes a partir de texto"/>
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className='mb-4'>            
              <div className="mt-2">
                <textarea
                  rows={8}
                  name="comment"
                  id="comment"
                  placeholder='Escribe sobre que trata el la image'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setText(e.target.value)}
                  defaultValue={''}
                />
              </div>
            </div> 
            <div className="flex mb-10 justify-end">        
           
           <a                 
                 className="hidden rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black sm:block"
               >
                 Done
               </a>            
            </div>            
            {result | isLoading ? (<div className="bg-white border rounded-md p-4">
                  <pre className="whitespace-pre-wrap break-word">
                      {isLoading ? "\n\nLoading ... \n\n" : "" }
                      {result? blogPostStructure(result) : ""}                      
                  </pre>
            </div>) : null}
          </div>                
        </main>        
      </div>
    </>
  )
}
