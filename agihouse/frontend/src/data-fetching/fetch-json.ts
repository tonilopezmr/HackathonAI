import { API_URL } from '../utils/variables'

export type AppState = {
  conversations: Conversation[]
  task_backlog: Task[]
  current_task: Task | null
}

export type Conversation = {
  conversation_id: string
  last_read_message_id: string | null
  messages: Message[]
  user_name: string
  user_profile_picture: string
  unread_message_count: number
  composer_display_value: string
}

export type Message = {
  message_id: string
  text_content: string
  created_at: string
  type: 'user' | 'assistant'
}

export type Task = {
  conversation_id: string
  prompt: string
}

/**
 * Creates a WebSocket connection to the state endpoint
 * @returns A WebSocket connection that emits state updates
 */
/**
 * Creates a WebSocket connection to the state endpoint with auto-reconnect
 * @returns A WebSocket connection that emits state updates
 */
export function createStateWebSocket(): WebSocket {
  const wsUrl = API_URL.replace('http', 'ws') + '/state'
  let reconnectAttempts = 0
  const maxReconnectAttempts = 50
  const baseDelay = 1000 // Start with 1 second delay
  let socket: WebSocket = new WebSocket(wsUrl)

  function connect() {
    socket = new WebSocket(wsUrl)

    socket.onopen = () => {
      console.log('WebSocket connected')
      reconnectAttempts = 0 // Reset attempts on successful connection
    }

    socket.onclose = (event) => {
      if (reconnectAttempts < maxReconnectAttempts) {
        // Exponential backoff with a maximum of 30 seconds
        const delay = Math.min(baseDelay * Math.pow(1.5, reconnectAttempts), 30000)
        console.log(`WebSocket closed. Reconnecting in ${delay}ms...`, event.code)
        
        setTimeout(() => {
          reconnectAttempts++
          connect()
        }, delay)
      } else {
        console.error('Max reconnection attempts reached')
      }
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  connect()
  return socket
}

/**
 * Parses the JSON data from the WebSocket
 * @param data The data received from the WebSocket
 * @returns The parsed state object
 */
export function parseStateData(data: string): AppState {
  return JSON.parse(data) as AppState
}
