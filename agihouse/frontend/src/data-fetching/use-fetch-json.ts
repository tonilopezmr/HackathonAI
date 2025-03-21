import { useCallback, useState } from 'react'
import useSWRSubscription from 'swr/subscription'
import type { AppState } from './fetch-json'
import { createStateWebSocket, parseStateData } from './fetch-json'

type StateSubscriptionOptions = {
  onSuccess?: (data: AppState) => void
  onError?: (error: Error) => void
}

type SubscriptionCallback = (
  key: string,
  { next }: { next: (error: Error | null, data?: AppState) => void },
) => () => void

/**
 * Hook to subscribe to real-time state updates from the server
 * @param options Optional callbacks for success and error handling
 * @returns The current state and loading/error information
 */
export function useStateSubscription(options?: StateSubscriptionOptions) {
  const [isConnecting, setIsConnecting] = useState(false)

  const stateSubscription = useCallback<SubscriptionCallback>(
    (key, { next }) => {
      setIsConnecting(true)

      // Create WebSocket connection
      const socket = createStateWebSocket()

      // Set up event handlers
      socket.onopen = () => {
        setIsConnecting(false)
      }

      socket.onmessage = (event) => {
        try {
          const data = parseStateData(event.data)
          next(null, data)
          options?.onSuccess?.(data)
        } catch (error) {
          next(error as Error)
          options?.onError?.(error as Error)
        }
      }

      socket.onerror = (event) => {
        console.error('WebSocket error:', event)
        const error = new Error('WebSocket error')
        next(error)
        options?.onError?.(error)
      }

      // Cleanup function
      return () => {
        socket.close()
      }
    },
    [options],
  )

  const { data, error } = useSWRSubscription('state', stateSubscription, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0
  })

  return {
    state: data as AppState | undefined,
    error,
    isLoading: !data && !error,
    isConnecting,
  }
}
