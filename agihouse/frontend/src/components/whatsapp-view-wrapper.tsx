'use client'

import WhatsAppView from '@/components/whatsapp-view'
import { useStateSubscription } from '@/data-fetching/use-fetch-json'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import WhatsappEncryptedIcon from '../../public/whatsapp-ripoff-icons/WhatsappEncryptedIconOutline.svg'
import WhatsappSpoofIcon from '../../public/whatsapp-ripoff-icons/WhatsappSpoofIcon.svg'

export const WhatsAppViewWrapper = () => {
  const [fakeLoading, setFakeLoading] = useState(false)  
  const { state, error, isLoading, isConnecting } = useStateSubscription({
    onSuccess: (data) => {      
    },
    onError: (error) => {
      console.error('WebSocket error:', error)
    },
  })

  
  useEffect(() => {
    setFakeLoading(true)
    setTimeout(() => {
      setFakeLoading(false)
    }, 2000)
  }, [])

  if (isLoading || fakeLoading || isConnecting || (!state && !error)) {
    return (
      <div className="bg-loading-whatsapp-background flex h-screen w-screen flex-col items-center justify-center gap-4">
        <Image
          src={WhatsappSpoofIcon}
          width={50}
          height={50}
          alt="Whatsapp Spoof"
        />
        <div className="text-lg font-medium">WhatsApp</div>
        <div className="bg-muted-foreground/25 h-1 w-40 overflow-hidden rounded-full">
          <div className="loading-bar-animation h-1 bg-[var(--color-whatsapp-main-background-stripe)]" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 font-medium">
          <Image
            src={WhatsappEncryptedIcon}
            width={16}
            height={16}
            alt="Whatsapp Encrypted"
          />
          End to end encrypted
        </div>
      </div>
    )
  }

  if (!state) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: {error?.message}
      </div>
    )
  }

  return <WhatsAppView state={state} />
}
