import Image from 'next/image'
import WhatsappForMac from '../../public/whatsapp-ripoff-other/WhatsAppForMac.png'

export const WhatsAppEmptyState = () => {
  return (
    <div className="bg-whatsapp-empty-state-background text-whatsapp-empty-state-text flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <Image
          src={WhatsappForMac}
          alt="Whatsapp For Mac"
          width={320}
          height={320}
        />
        <div className="flex flex-col gap-4 text-center">
          <div className="text-4xl font-extralight">
            Download WhatsApp for Mac
          </div>
          <p className="text-sm">
            Make calls and get a faster experience when you download the Mac
            app.
          </p>
        </div>
        <button className="bg-whatsapp-color-button-background rounded-full px-6 py-2.5 text-sm font-semibold text-white">
          Get from App Store
        </button>
      </div>
    </div>
  )
}
