import { sendMessage } from '@/data-fetching/send-message'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MicIcon from '../../public/whatsapp-ripoff-icons/WhatsappMicFilled.svg'
import PlusIcon from '../../public/whatsapp-ripoff-icons/WhatsappPlusOutline.svg'
import SendIcon from '../../public/whatsapp-ripoff-icons/WhatsappSendFilled.svg'
import StickerIcon from '../../public/whatsapp-ripoff-icons/WhatsappStickerOutline.svg'

interface ComposerProps {
  conversationId: string | null
  composerDisplayValue: string
  currentTaskConversationId: string | undefined
}

export default function Composer({
  conversationId,
  composerDisplayValue,
  currentTaskConversationId,
}: ComposerProps) {
  const [displayText, setDisplayText] = useState('')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    // Only animate when composerDisplayValue is not empty
    if (!composerDisplayValue) {
      setDisplayText('')
      return
    }

    // Start with empty text
    setDisplayText('')

    const totalDuration = 1500 // 1.5 seconds
    const tickRate = 50 // Update every 50ms
    const totalTicks = totalDuration / tickRate
    const charsPerTick = Math.max(
      1,
      Math.ceil(composerDisplayValue.length / totalTicks),
    )

    let currentPosition = 0

    const typingInterval = setInterval(() => {
      currentPosition = Math.min(
        currentPosition + charsPerTick,
        composerDisplayValue.length,
      )
      setDisplayText(composerDisplayValue.substring(0, currentPosition))

      if (currentPosition >= composerDisplayValue.length) {
        clearInterval(typingInterval)
      }
    }, tickRate)

    return () => clearInterval(typingInterval)
  }, [composerDisplayValue])

  const handleSendMessage = async () => {
    if (!displayText.trim() || !conversationId || isSending) {
      return
    }

    try {
      setIsSending(true)
      await sendMessage(conversationId, displayText)
      setDisplayText('') // Reset input after successful send
    } catch (error) {
      console.error('Failed to send message:', error)
      // You could add a toast notification here
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Determine if typing animation is in progress
  const isTyping =
    composerDisplayValue !== '' && displayText !== composerDisplayValue

  return (
    <div className="relative flex items-center gap-2 bg-[#f0f2f5] p-3 px-6">
      <Image src={PlusIcon} alt="Plus Icon" className="h-8 w-8 text-gray-500" />
      <div className="relative flex flex-grow items-center rounded-lg bg-white px-2">
        <Image
          src={StickerIcon}
          alt="Sticker Icon"
          className="h-6 w-6 text-gray-500"
        />
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 rounded-lg bg-white p-2 outline-none"
          value={displayText}
          onChange={(e) => setDisplayText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!conversationId || isSending || isTyping}
        />
      </div>
      <div className="flex w-9 items-center justify-center">
        {displayText.trim() ? (
          <button
            onClick={handleSendMessage}
            disabled={!conversationId || isSending || isTyping}
            className="cursor-pointer"
          >
            <Image
              src={SendIcon}
              alt="Send Icon"
              className="h-6 w-6 text-white"
            />
          </button>
        ) : (
          <Image
            src={MicIcon}
            alt="Mic Icon"
            className="h-6 w-6 text-gray-500"
          />
        )}
      </div>
    </div>
  )
}
