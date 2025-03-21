import Header from './Header'
import SmartPipe from './SmartPipe'
import { tutorial } from '../pages/tutorial';
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

import React, { useState, useEffect } from 'react';

const statuses = {
  POST: 'text-purple-700 bg-purple-50 ring-purple-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  GET: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',  
  error: 'text-red-800 bg-red-50 ring-red-600/20',  
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SList = ({smartPipes, setCurrentSmartPipe}) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
                {smartPipes.map((project) => (
                  <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
                    <div className="min-w-0">
                      <div className="flex items-start gap-x-3">                      
                        <p
                          className={classNames(
                            statuses[project.method],
                            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                          )}
                        >
                          {project.method}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">{project.path}</p>
                      </div>
                      <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                        <p className="whitespace-nowrap">
                          ID: {project.id}
                        </p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                          <circle cx={1} cy={1} r={1} />
                        </svg>                      
                      </div>
                    </div>
                    <div className="flex flex-none items-center gap-x-4">
                      <a
                        onClick={() => {setCurrentSmartPipe(project)}}
                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                      >
                        View SmartPipe<span className="sr-only">, {project.name}</span>
                      </a>                    
                    </div>
                  </li>
                ))}
              </ul>
  )
}

export default function SmartPipeList({ smartPipes, currentRequest, currentSmartPipe, setCurrentSmartPipe }) {  

  return (
    <div className="min-h-full">
        <Header />

        <header className="bg-gray-100 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold leading-10 text-gray-900">SmartPipes</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">            
            <div className="mx-auto max-w-3xl">
              { smartPipes.length === 0 ?  <div class="prose lg:prose-xl"><ReactMarkdown
    children={tutorial}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            /> </div>: null}        
              { currentSmartPipe !== undefined ? <SmartPipe currentRequest={currentRequest} smartPipe={currentSmartPipe} /> : <SList smartPipes={smartPipes} setCurrentSmartPipe={setCurrentSmartPipe} />}
            </div>
          </div>            
          </div>
        </main>
      </div>
  )  
}