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
  const [result, setResult] = useState({"blog_post":"Ganar un hackathon de dos d\u00edas puede parecer una tarea desafiante, especialmente si solo tienes tres miembros en tu equipo. Pero, con la mentalidad correcta y una buena estrategia, puedes tener \u00e9xito y llevar a casa el primer lugar.\n\nAqu\u00ed hay algunos consejos que te ayudar\u00e1n a ganar un hackathon de dos d\u00edas con solo tres miembros en tu equipo:\n\n1. Selecciona un proyecto realista: Aseg\u00farate de seleccionar un proyecto que puedas completar en el tiempo asignado. No elijas un proyecto que sea demasiado ambicioso y que no puedas terminar a tiempo. En cambio, elige un proyecto que sea realista y que puedas completar en el plazo asignado.\n\n2. Divide y conquista: Como solo tienes tres miembros en tu equipo, es importante que cada uno tenga un papel definido. Divide las tareas en funci\u00f3n de las habilidades y fortalezas de cada miembro. De esta manera, podr\u00e1s trabajar de manera m\u00e1s eficiente y productiva.\n\n3. Trabaja en equipo: Aunque cada miembro tiene un papel definido, es importante que trabajen juntos como un equipo. Comunica tus ideas y escucha las ideas de los dem\u00e1s. Trabajando juntos, pueden crear un proyecto m\u00e1s s\u00f3lido y completo.\n\n4. Mant\u00e9n el enfoque: Con solo dos d\u00edas para completar el proyecto, es importante mantener el enfoque y no desperdiciar tiempo en cosas innecesarias. Evita las distracciones y mant\u00e9n tu objetivo en mente.\n\n5. Practica la presentaci\u00f3n: La presentaci\u00f3n es una parte importante del hackathon. Practica tu presentaci\u00f3n varias veces antes de presentarla. Aseg\u00farate de que todos los miembros del equipo est\u00e9n en la misma p\u00e1gina y que cada uno conozca su parte.\n\nSiguiendo estos consejos, puedes tener \u00e9xito en un hackathon de dos d\u00edas con solo tres miembros en tu equipo. Recuerda, la clave es trabajar juntos, mantener el enfoque y presentar un proyecto s\u00f3lido y completo. \u00a1Buena suerte!","images":["https://replicate.delivery/pbxt/oMh1t40YeWUPa6MGfKFcuFRSgGeJFellWVd8681EEuLXXFDEB/out-0.png","https://replicate.delivery/pbxt/Vtrr47cxqR4cBxRPVZFtlkuZn7DMZW1mZyRGWNpHRxbdVMQE/out-1.png","https://replicate.delivery/pbxt/6nsi4sX8ofUwEyhsvBswnkCYe00ZKleAy8rckqhGyOxsriBiA/out-2.png","https://replicate.delivery/pbxt/eBgJBAcXjqSPUiobYMKCo4jfTXvFwdLsVxwr09f02QfcXFDEB/out-3.png"]});

  const writeBlog = (topic) => {    
    console.log(topic)
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
      console.log(data)
      setResult(data)
      return data   
    })
  }

  return (
    <>  
      <div className="min-h-full">
        
        <Header />
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className='mb-4'>            
              <div className="mt-2">
                <textarea
                  rows={8}
                  name="comment"
                  id="comment"
                  placeholder='Escribe sobre que trata el blog post'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setText(e.target.value)}
                  defaultValue={''}
                />
              </div>
            </div> 
            <div className="flex mb-10 justify-end">        
           
           <a
                 onClick={() => {writeBlog(text)}}
                 className="hidden rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black sm:block"
               >
                 Cargar
               </a>            
            </div>            
            {result ? (<div className="bg-white border rounded-md p-4">
                  <pre className="whitespace-pre-wrap break-word">
                      {blogPostStructure(result)}                      
                  </pre>
            </div>) : null}
          </div>                
        </main>        
      </div>
    </>
  )
}
