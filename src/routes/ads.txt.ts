import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute('/ads.txt').methods({
  GET: () => {
    return new Response(
      'google.com, pub-6436860193358277, DIRECT, f08c47fec0942fa0',
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    )
  },
})
