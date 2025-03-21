import Image from 'next/image'
import { useEffect, useState } from 'react'

// Sidebar components
import { WhatsAppEmptyState } from '@/components/whatsapp-empty-state'
import {
  AppState,
  Conversation,
  Message as MessageType,
} from '@/data-fetching/fetch-json'
import { markMessagesAsRead } from '@/data-fetching/mark-messages-read'
import { cn } from '@/utils/cn'
import { getProfilePicture } from '@/utils/get-profile-picture'
import UserIcon from '../../public/UserIcon.png'
import MetaIcon from '../../public/whatsapp-ripoff-icons/MetaAIIcon.png'
import ChannelsIcon from '../../public/whatsapp-ripoff-icons/WhatsappChannelsOutline.svg'
import ChatIcon from '../../public/whatsapp-ripoff-icons/WhatsappChatFilled.svg'
import ChevronRightIcon from '../../public/whatsapp-ripoff-icons/WhatsappChevronRightOutline.svg'
import CommunitiesIcon from '../../public/whatsapp-ripoff-icons/WhatsappCommunitiesOutline.svg'
import EllipsisIcon from '../../public/whatsapp-ripoff-icons/WhatsappEllipsisFilled.svg'
import NewChatIcon from '../../public/whatsapp-ripoff-icons/WhatsappNewChatOutline.svg'
import SearchIcon from '../../public/whatsapp-ripoff-icons/WhatsappSearchOutline.svg'
import SettingsIcon from '../../public/whatsapp-ripoff-icons/WhatsappSettingsOutline.svg'
import StatusIcon from '../../public/whatsapp-ripoff-icons/WhatsappStatusOutline.svg'
import VideoIcon from '../../public/whatsapp-ripoff-icons/WhatsappVideoFilled.svg'
import ChatTailLeft from '../../public/whatsapp-ripoff-other/ChatTailLeft.svg'
import ChatTailRight from '../../public/whatsapp-ripoff-other/ChatTailRight.svg'
import Composer from './composer'

const SearchBar = () => {
  return (
    <div className="flex items-center rounded-lg bg-[#f0f2f5] p-2">
      <Image src={SearchIcon} alt="Search" className="h-6 w-6 text-gray-500" />
      <input
        type="text"
        placeholder="Search"
        className="ml-2 w-full border-none bg-transparent text-sm outline-none"
      />
    </div>
  )
}

const ChatTabs = () => {
  return (
    <div className="text-15px flex gap-2">
      <button className="bg-tab-button-selected w-fit rounded-full px-3 py-2 font-medium leading-none text-[#00a884]">
        All
      </button>
      <button className="w-fit rounded-full bg-[#f0f2f5] px-3 py-1.5 font-medium leading-none text-gray-600 hover:bg-[#e9edef]">
        Unread
      </button>
      <button className="w-fit rounded-full bg-[#f0f2f5] px-3 py-1.5 font-medium leading-none text-gray-600 hover:bg-[#e9edef]">
        Favorites
      </button>
      <button className="w-fit rounded-full bg-[#f0f2f5] px-3 py-1.5 font-medium leading-none text-gray-600 hover:bg-[#e9edef]">
        Groups
      </button>
    </div>
  )
}

const ChatItem = ({
  conversation,
  isSelected,
  onClick,
}: {
  conversation: Conversation
  isSelected: boolean
  onClick: () => void
}) => {
  // Get the last message for preview
  const lastMessage =
    conversation.messages.length > 0
      ? conversation.messages[conversation.messages.length - 1]
      : null

  // Format the message preview
  const messagePreview = lastMessage
    ? `${conversation.user_name}: ${lastMessage.text_content}`
    : 'No messages'

  // Format the time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { month: 'numeric', day: 'numeric' })
    }
  }

  const time = lastMessage ? formatTime(lastMessage.created_at) : ''

  // Get profile picture or generate one if not available
  const profilePicture =
    conversation.user_profile_picture ||
    getProfilePicture(conversation.user_name)

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center border-b border-[#f5f6f6] p-3 hover:bg-[#f5f6f6]',
        isSelected ? 'bg-[#f0f2f5]' : '',
      )}
      onClick={onClick}
    >
      <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300">
        <img
          src={profilePicture}
          alt={conversation.user_name}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <span className="font-medium">{conversation.user_name}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <div className="mt-0.5 flex justify-between">
          <p className="line-clamp-1 break-all text-sm text-gray-500">
            {messagePreview}
          </p>
          {conversation.unread_message_count > 0 && (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-xs text-white">
              {conversation.unread_message_count}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Chat components
const ChatHeader = ({
  conversation,
}: {
  conversation: Conversation | null
}) => {
  if (!conversation) {
    return (
      <div className="relative flex items-center border-l border-[#d1d7db] bg-[#f0f2f5] p-3"></div>
    )
  }

  // Get profile picture or generate one if not available
  const profilePicture =
    conversation.user_profile_picture ||
    getProfilePicture(conversation.user_name)

  return (
    <div className="border-b-whatsapp-sidebar-border relative flex items-center border-b  bg-[#f0f2f5] p-3">
      <div className="h-10 w-10 rounded-full bg-gray-300">
        <img
          src={profilePicture}
          alt={conversation.user_name}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="ml-3 flex-1">
        <p className="font-medium">{conversation.user_name}</p>
        <p className="text-xs text-gray-500">{conversation.conversation_id}</p>
      </div>
      <div className="flex items-center gap-6 pr-3">
        <div className="flex items-center gap-2 opacity-50">
          <Image src={VideoIcon} alt="Video" width={26} height={26} />
          <Image
            src={ChevronRightIcon}
            alt="Chevron Right"
            className="rotate-90"
            width={12}
            height={12}
          />
        </div>
        <Image src={SearchIcon} alt="Search" width={30} height={30} />
        <Image src={EllipsisIcon} alt="Ellipsis" width={24} height={24} />
      </div>
    </div>
  )
}

const SidebarButtonWrapper = ({
  children,
  isSelected,
}: {
  children: React.ReactNode
  isSelected: boolean
}) => {
  return (
    <div
      className={cn(
        `flex h-10 w-10 items-center justify-center rounded-full`,
        isSelected ? 'bg-[#0b141a]/10' : '',
      )}
    >
      {children}
    </div>
  )
}

const Message = ({
  message,
  isFirst,
  userName,
  userProfilePicture,
}: {
  message: MessageType
  isFirst: boolean
  userName: string
  userProfilePicture: string
}) => {
  const sent = message.type === 'assistant'

  // Format the time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Check if message is short (less than 35 characters)
  const isShortMessage = message.text_content.length < 35
  const renderProfilePic = !sent && isFirst
  const renderEmptySpace = !sent && !isFirst

  // Get profile picture or generate one if not available
  const profilePicture = userProfilePicture || getProfilePicture(userName)

  return (
    <div
      className={cn(`mb-1 flex gap-3`, sent ? 'justify-end' : 'justify-start')}
    >
      {renderProfilePic ? (
        <div className="h-8 w-8 rounded-full bg-gray-300">
          <img
            src={profilePicture}
            alt={userName}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      ) : renderEmptySpace ? (
        <div className="w-8 rounded-full " />
      ) : null}
      <div className="relative max-w-[65%] ">
        <div className="absolute inset-0 translate-y-[1.5px] rounded-md bg-black/10 blur-[1px]" />
        {sent
          ? isFirst && (
              <Image
                src={ChatTailRight}
                alt="Chat Tail Right"
                height={10}
                width={10}
                className="absolute left-full top-0 "
              />
            )
          : isFirst && (
              <Image
                src={ChatTailLeft}
                alt="Chat Tail Left"
                height={10}
                width={10}
                className="absolute right-full top-0"
              />
            )}
        <div
          className={cn(
            'relative rounded-md p-2',
            sent ? 'rounded-tr-none bg-[#d9fdd3]' : 'rounded-tl-none bg-white',
            !isFirst ? 'rounded-md' : '',
          )}
        >
          {!sent && isFirst && (
            <p className="mb-0.5 text-xs font-medium text-[#00a884]">
              {userName}
            </p>
          )}
          <div className={isShortMessage ? 'flex items-end gap-2' : ''}>
            <p
              className={cn(
                'break-words text-sm',
                isShortMessage ? 'flex-grow' : '',
              )}
            >
              {message.text_content}
            </p>
            <p
              className={cn(
                'translate-x-0.5 translate-y-1 text-xs  text-gray-500 ',
                isShortMessage ? 'whitespace-nowrap' : 'mt-1 text-right',
              )}
            >
              {formatTime(message.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WhatsAppView({ state }: { state: AppState }) {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null)

  const currentTaskConversationId = state.current_task?.conversation_id

  useEffect(() => {
    if (currentTaskConversationId) {
      setSelectedConversationId(currentTaskConversationId)
      markMessagesAsRead(currentTaskConversationId)
    }
  }, [currentTaskConversationId])

  // Find the selected conversation
  const selectedConversation =
    state.conversations.find(
      (conv) => conv.conversation_id === selectedConversationId,
    ) || null

  // Group messages by user and determine which ones are "first" in their group
  const renderMessages = () => {
    if (!selectedConversation) return null

    // Sort messages by time
    const sortedMessages = [...selectedConversation.messages].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )

    // Determine which messages are first in their group
    const messagesWithFirstFlag = sortedMessages.map((message, index) => {
      const isFirst =
        index === 0 || sortedMessages[index - 1].type !== message.type

      return { ...message, isFirst }
    })

    return messagesWithFirstFlag.map((message, index) => (
      <Message
        key={message.message_id}
        message={message}
        isFirst={message.isFirst}
        userName={selectedConversation.user_name}
        userProfilePicture={selectedConversation.user_profile_picture}
      />
    ))
  }

  return (
    <div className="bg-whatsapp-main-background animate-scale-in after:bg-whatsapp-main-background-stripe flex h-screen p-5 after:absolute after:inset-0 after:h-32 after:bg-repeat-y">
      <div className="relative z-10 mx-auto flex w-full max-w-[100rem] overflow-hidden bg-white shadow-lg">
        {/* Left sidebar with icons */}
        <div className="border-whatsapp-sidebar-border-darker bg-whatsapp-sidebar-background w-17 border-r">
          <div className="border-whatsapp-sidebar-border flex h-full w-full flex-col items-center justify-between gap-6 border-r py-3">
            <div className="flex flex-col items-center gap-2.5">
              <SidebarButtonWrapper isSelected={true}>
                <Image
                  src={ChatIcon}
                  alt="Chats"
                  width={24}
                  height={24}
                  className="shrink-0 cursor-pointer"
                />
              </SidebarButtonWrapper>
              <SidebarButtonWrapper isSelected={false}>
                <Image
                  src={StatusIcon}
                  alt="Status"
                  width={24}
                  height={24}
                  className="shrink-0 cursor-pointer text-gray-600"
                />
              </SidebarButtonWrapper>
              <SidebarButtonWrapper isSelected={false}>
                <Image
                  src={ChannelsIcon}
                  alt="Channels"
                  width={24}
                  height={24}
                  className="shrink-0 cursor-pointer text-gray-600"
                />
              </SidebarButtonWrapper>
              <SidebarButtonWrapper isSelected={false}>
                <Image
                  src={CommunitiesIcon}
                  alt="Communities"
                  width={24}
                  height={24}
                  className="shrink-0 cursor-pointer text-gray-600"
                />
              </SidebarButtonWrapper>
              <SidebarButtonWrapper isSelected={false}>
                <Image
                  src={MetaIcon}
                  alt="Meta"
                  width={20}
                  height={20}
                  className="shrink-0 cursor-pointer text-gray-600"
                />
              </SidebarButtonWrapper>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <SidebarButtonWrapper isSelected={false}>
                <Image
                  src={SettingsIcon}
                  alt="Settings"
                  width={24}
                  height={24}
                  className="mt-auto shrink-0 cursor-pointer text-gray-600"
                />
              </SidebarButtonWrapper>
              <SidebarButtonWrapper isSelected={false}>
                <Image
                  src={UserIcon}
                  alt="User"
                  width={32}
                  height={32}
                  className="mt-auto cursor-pointer rounded-full text-gray-600"
                />
              </SidebarButtonWrapper>
            </div>
          </div>
        </div>

        {/* Chat list */}
        <div className="flex w-1/3 flex-col border-r border-[#d1d7db]">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-22px font-extrabold">Chats</h1>
              <div className="flex items-center gap-4">
                <Image
                  src={NewChatIcon}
                  alt="New Chat"
                  width={24}
                  height={24}
                  className="shrink-0 cursor-pointer"
                />
                <Image
                  src={EllipsisIcon}
                  alt="Ellipsis"
                  width={24}
                  height={24}
                  className="shrink-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <SearchBar />
              <ChatTabs />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {state.conversations.map((conversation) => (
              <ChatItem
                key={conversation.conversation_id}
                conversation={conversation}
                isSelected={
                  selectedConversationId === conversation.conversation_id
                }
                onClick={() => {
                  markMessagesAsRead(conversation.conversation_id)
                  setSelectedConversationId(conversation.conversation_id)
                }}
              />
            ))}
          </div>
        </div>
        {/* Chat */}
        {selectedConversationId ? (
          <div className="bg-whatsapp-background relative flex w-2/3 flex-col">
            <div
              className="absolute inset-0 z-0 opacity-50"
              style={{
                backgroundImage:
                  "url('/whatsapp-ripoff-bg/whatsapp-bg-pattern.png')",
                backgroundRepeat: 'repeat',
              }}
            />
            <ChatHeader conversation={selectedConversation} />
            <div className="z-1 relative flex flex-1 flex-col-reverse overflow-y-auto p-4 px-8">
              <div className="flex flex-col">
                <div className="mb-4 self-center rounded-lg bg-white px-3 py-1 text-sm shadow-sm">
                  3/15/2025
                </div>
                {renderMessages()}
              </div>
            </div>
            <Composer
              conversationId={selectedConversationId}
              composerDisplayValue={
                selectedConversation?.composer_display_value ?? ''
              }
              currentTaskConversationId={currentTaskConversationId}
            />
          </div>
        ) : (
          <div className="w-2/3">
            <WhatsAppEmptyState />
          </div>
        )}
      </div>
    </div>
  )
}
