import 'focus-visible'
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (    
    <>
      <Component {...pageProps} />
      <Analytics />    
    </>
  )
}