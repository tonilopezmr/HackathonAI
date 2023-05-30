import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header } from '@/board/Header'
import Instructions from '@/board/Instructions'
import { useEffect, useState } from 'react';
import { SelectField, TextField } from '@/landing/Fields'

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
        
        <Header title="Traduce como un nativo"/>
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className='mb-4'>            
              <div className="mt-2">
                <textarea
                  rows={8}
                  name="comment"
                  id="comment"
                  placeholder='Escribe aquí cualquier texto'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setText(e.target.value)}
                  defaultValue={''}
                />
              </div>
            </div> 
            <div className="mt-8 mx-auto ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6 flex" >                      
              <SelectField
                className="ml-10 col-span-full"
                label="Traduce de"
                id="position"
                name="position"
              >                
                <option>Español</option>
                <option>Inglés</option>
                <option>Aleman</option>
                <option>Portugues</option>
                <option>Mandarin</option>                
              </SelectField>
              <SelectField
                className="justify-end ml-10 col-span-full"
                label="a siguiente idioma: "
                id="referral_source"
                name="referral_source"
              >                
                <option>Inglés</option>
                <option>Español</option>
                <option>Aleman</option>
                <option>Portugues</option>
                <option>Mandarin</option>
              </SelectField>
            <div>                                                      
            </div>
          </form>       
        </div>
      </div>
            
            <div className='mb-4'>            
              <div className="mt-2">
                <textarea
                  rows={8}
                  name="comment"
                  id="comment"
                  placeholder='Escribe aquí cualquier texto'
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
                 Cargar
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
