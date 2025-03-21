import Head from 'next/head'

import { CallToAction } from '@/landing/CallToAction'
import { Faqs } from '@/landing/Faqs'
import { Footer } from '@/landing/Footer'
import { Header } from '@/landing/Header'
import { Hero } from '@/landing/Hero'
import { Pricing } from '@/landing/Pricing'
import { PrimaryFeatures } from '@/landing/PrimaryFeatures'
import { SecondaryFeatures } from '@/landing/SecondaryFeatures'
import { Testimonials } from '@/landing/Testimonials'
import Developers from '@/landing/Developers'
import { Team } from '@/landing/Team'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bodia AI - IA Accesible para todo el mundo</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />        
        <Developers />                     
        <Pricing />        
        <Team />
      </main>
      <Footer />
    </>
  )
}
