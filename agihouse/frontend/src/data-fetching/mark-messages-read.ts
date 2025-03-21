import { API_URL } from '../utils/variables'

/**
 * Interface for the request payload to mark messages as read
 */
export interface MarkMessagesReadRequest {
  conversation_id: string
}

/**
 * Interface for the response from marking messages as read
 */
export interface MarkMessagesReadResponse {
  status: string
  message: string
}

/**
 * Marks all messages in a conversation as read
 * @param conversationId The ID of the conversation to mark as read
 * @returns A promise that resolves with the response when the messages are marked as read
 */
export async function markMessagesAsRead(
  conversationId: string,
): Promise<MarkMessagesReadResponse> {
  try {
    const response = await fetch(`${API_URL}/whatsapp/mark-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
      } as MarkMessagesReadRequest),
    })

    if (!response.ok) {
      throw new Error(`Failed to mark messages as read: ${response.statusText}`)
    }

    return (await response.json()) as MarkMessagesReadResponse
  } catch (error) {
    console.error('Error marking messages as read:', error)
    throw error
  }
}
