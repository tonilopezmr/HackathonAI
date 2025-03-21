import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header } from '@/board/Header'
import Instructions from '@/board/Instructions'

export default function Dashboard() {
  return (
    <>     
      <div className="min-h-full">
        
        <Header />
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{
            <Instructions />
          }</div>          
        </main>        
      </div>
    </>
  )
}
