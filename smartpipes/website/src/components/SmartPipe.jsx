
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Logo } from './Logo'

function convertLinksToString(jsonObj) {
  if (typeof jsonObj === "string") {
    if (jsonObj.match(/\b(http|https)?(:\/\/)?\S+/gi)) {
      return <a href={jsonObj} target="_blank" rel="noopener noreferrer">{jsonObj}</a>;
    }
    return jsonObj;
  } else if (Array.isArray(jsonObj)) {
    return jsonObj.map((item, i) => {
      return (
        <span key={i}>
          {convertLinksToString(item)}
          {i < jsonObj.length - 1 && ", "}
        </span>
      );
    });
  } else if (typeof jsonObj === "object" && jsonObj !== null) {
    return Object.keys(jsonObj).map((key) => {
      return (
        <div key={key}>
          <span className="font-semibold">{key}: </span>
          {convertLinksToString(jsonObj[key])}
        </div>
      );
    });
  }
  return jsonObj;
}

const icons = (model) => {
  const default_icon = {
    icon: '/seaplane_logo_mark.svg',
    color: 'bg-yellow-500'
  }
  
  const results = {
    "gpt-3.5": {
      icon: '/openai.png',
      color: 'bg-[#43B581]'
    },
    "gpt-3": {
      icon: '/openai.png',
      color: 'bg-[#43B581]'
    },
    "stable-diffusion": {
      icon: '/stabilityai.png',
      color: 'bg-blue-500'
    }  
  }

  const icon = results[model]

  return icon === undefined ? default_icon : icon
}

const showError = (error) => {

  return error.reduce((prev, cur) => prev + cur + "\n", "")
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const onClick = (smartPipe, body) => {
  console.log(`Request to ${smartPipe.path} with body: ${JSON.stringify(body)}`)
  fetch(`http://localhost:1337${smartPipe.path}`, {
    method: smartPipe.method,    
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  })
  .then((res) => console.log(res))
}


const statuses = {
  POST: 'text-purple-700 bg-purple-50 ring-purple-600/20',
  in_progress: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  GET: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',  
  error: 'text-red-800 bg-red-50 ring-red-600/20',  
  completed: 'text-green-800 bg-green-50 ring-green-600/20',  
}

const getCoprocessorEvent = (currentRequest, coprocessor) => {  
  if(currentRequest === undefined) return undefined

  const res = currentRequest.coprocessors.filter(co => co.id === coprocessor.id)
  return res.length > 0 ? res[0] : undefined
}

export default function SmartPipe({currentRequest, smartPipe}) {
  const [body, setBody] = useState(undefined)

  return (
    <div className="flow-root">
        
      {smartPipe?.method === 'POST' ? (<div className='mb-4'>
        <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
          Make a request to {smartPipe.method} {smartPipe.path} 
        </label>
        <div className="mt-2">
          <textarea
            rows={3}
            name="comment"
            id="comment"
            placeholder=' POST body request'
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={e => setBody(e.target.value)}
            defaultValue={''}
          />
        </div>
      </div>) : null}
      <div className="flex mb-10 justify-end">        
           
                  <a
                        onClick={() => {onClick(smartPipe, body)}}
                        className="hidden rounded-md bg-[#00bda5] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black sm:block"
                      >
                        Make Request
                      </a>            
        </div>
      <ul role="list" className="-mb-8">
      <li key={smartPipe.id}>
            <div className="relative pb-8">
              <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      'bg-[#00bda5]',
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >                    
                    <Logo logo="true" color="#ffffff" className="h-5 w-5" />                      
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>                    
                    <div className="flex items-start gap-x-3">                      
                        <p
                          className={classNames(
                            statuses[smartPipe.method],
                            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                          )}
                        >
                          {smartPipe.method}
                        </p>                        
                        <p className="text-sm font-semibold leading-6 text-gray-900">{' '+ smartPipe.id }</p>
                                               
                      </div>                      
                      {currentRequest !== undefined ? (
                        <div className="flex my-5">
                          <p>Request input: {currentRequest.input}</p>                          
                        </div>
                      ): null}                      
                  </div>                        
                  {currentRequest !== undefined ? (<div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <p
                            className={classNames(
                              statuses[currentRequest.status],
                              'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                            )}
                          >
                            {currentRequest.status}
                          </p>                                                  
                        </div>) : null}
                </div>
              </div>
            </div>
          </li>
        {smartPipe.coprocessors.map((coprocessor, eventIdx) => (
          <li key={coprocessor.id}>
            <div className="relative pb-8">
              {eventIdx !== smartPipe.coprocessors.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      icons(coprocessor.model).color,
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    <Image src={icons(coprocessor.model).icon} width={24} height={24} alt="OpenAI logo" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">                  
                  <div>                                                               
                    <p className="text-sm text-gray-500">
                      {coprocessor.type === 'compute' ? 'Compute' : <span className='text-sm font-semibold'>{'Model: ' + coprocessor.model}</span> }{' '}<span className='text-sm font-semibold'>{'ID: ' + coprocessor.id} </span>
                    </p>                                                       
                    {getCoprocessorEvent(currentRequest, coprocessor) !== undefined ? (
                        <div>                          
                          <div className="my-5">
                            <p className="font-semibold">Input:</p>
                            <div className="bg-white border rounded-md p-4">
                              <p className="">{getCoprocessorEvent(currentRequest, coprocessor).input}</p>
                            </div>
                          </div>                           
                          {getCoprocessorEvent(currentRequest, coprocessor).status !== 'error' ? (
                            <div className="my-5">
                            <p className="font-semibold">Output:</p>
                            <div className="bg-white border rounded-md p-4">
                              <p className="">{JSON.stringify(getCoprocessorEvent(currentRequest, coprocessor).output, null, 2)}</p>
                            </div>
                          </div>                         
                          ): (<div className="my-5">
                          <p className="text-red-500 font-semibold">Error:</p>
                          <div className="bg-gray-300 border rounded-md p-4">
                            <pre className="whitespace-pre-wrap break-word">{showError(getCoprocessorEvent(currentRequest, coprocessor).error)}</pre>
                          </div>
                        </div>)}
                          
                        </div>
                      ): null}    
                  </div>                  
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {getCoprocessorEvent(currentRequest, coprocessor) !== undefined ?  (<div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <p
                            className={classNames(
                              statuses[getCoprocessorEvent(currentRequest, coprocessor).status],
                              'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                            )}
                          >
                            {getCoprocessorEvent(currentRequest, coprocessor).status}
                          </p>                                                  
                        </div>) : null} 
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}

        {currentRequest !== undefined ? (
                                <div className="my-5">
                                <p className="font-semibold">Request Output:</p>
                                <div className="bg-white border rounded-md p-4">
                                  <pre className="whitespace-pre-wrap break-word">
                                  { convertLinksToString(currentRequest.output)}
                                  </pre>
                                </div>
                              </div>
                              ): null}          
      </ul>
    </div>
  )
}
