import type { ClientResponseError } from 'pocketbase'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ClientResponseError
  }
}