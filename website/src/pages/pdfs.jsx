import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header } from '@/board/Header'
import Instructions from '@/board/Instructions'
import { useEffect, useState } from 'react';

const EmptyState = ({ onFileSelected }) => (
  <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 bg-gradient-to-r hover:from-white hover:to-[#FEDE00]"
              >
                <span className="px-2">Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="application/pdf"                  
                  onChange={onFileSelected}
                />
              </label>
              <p className="pl-1 text-gray-400">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-400">PDFs</p>
          </div>
)

export default function WriteBlogPost() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState(null);
  const [isUploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isQuestionLoading, setQuestionLoading] = useState(false);
  const [isFileReady, setFileReady] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [answer, setAnswer] = useState(null);

  const uploadFile = (file) => {    
    const form = new FormData()
    form.append("file", file, file.name)
    setLoading(true);
    fetch(`https://smartpipes.bodia.ai/save_pdfs`, {
      method: 'post',
      headers: {      
        "Authorization": "Bearer amigos_hackathonianos"
      },
      body: form
    }).then((res) => {       
      return res.json() 
    }).then(data => {
      setLoading(false);
      setFileReady(true);
      setFileId(data.filename)
      console.log(data)      
    }).catch(err => {
      setLoading(false)
      setUploadError(true)
    });
  }


  const addNewFiles = (files) => {
    const validFileTypes = ['application/pdf'];
    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validFileTypes.includes(file.type)) {
        validFiles.push(file);
      }
    }    
    
    validFiles.map((file) => {                        
      setFile(file);
      uploadFile(file)
    }) 
  }

  function onDrop(event) {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    addNewFiles(newFiles)
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  const onClick = (text) => {
    console.log(text)
    setQuestionLoading(true)
    fetch(`https://smartpipes.bodia.ai/query_pdfs`, {
      method: "POST",    
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer amigos_hackathonianos"
      },
      body: JSON.stringify({ "query": text, "filename": fileId })
    })
    .then((res) => res.json())
    .then((data) => {      
      console.log(data)
      setQuestionLoading(false)
      setAnswer(data)
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
              {isFileReady ? <textarea
                  rows={8}
                  name="comment"
                  id="comment"
                  placeholder='Escribe sobre que trata el blog post'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setText(e.target.value)}
                  defaultValue={''}
                /> : (<div 
                className="mt-1 flex bg-white justify-center rounded-md border-2 border-dashed border-indigo-400 px-6 pt-5 pb-6"
                onDrop={onDrop}
                onDragOver={onDragOver}>                  
                  { loading ? "Uploading ... " : <EmptyState  /> }
                  { isUploadError ? "💥 Upload error :(" : ""}
                </div>)}
              </div>
            </div> 
            <div className="flex mb-10 justify-end">        
            { isFileReady ? 
            <a
                 onClick={() => {onClick(text)}}
                 className="hidden rounded-md bg-indigo-500 instruction. px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black sm:block"
               >
                 Consultar
               </a> : null     }
            </div>            
            {(isQuestionLoading || answer) ? (<div className="bg-white border rounded-md p-4">
                  <pre className="whitespace-pre-wrap break-word">                      
                      {answer? answer.answer : ""}
                      {isQuestionLoading ? "\n\nLoading ... \n\n" : "" }
                  </pre>
            </div>) : null}
          </div>                
        </main>        
      </div>
    </>
  )
}
