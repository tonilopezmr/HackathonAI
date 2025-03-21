import { API_URL } from '../utils/variables'

/**
 * Interface for the request payload to send a message
 */
export interface SendMessageRequest {
  conversation_id: string
  message: string
}

/**
 * Sends a message to a specific conversation
 * @param conversationId The ID of the conversation to send the message to
 * @param message The message content to send
 * @returns A promise that resolves when the message is sent
 */
export async function sendMessage(
  conversationId: string,
  message: string,
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/whatsapp/write`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        message,
      } as SendMessageRequest),
    })

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}
