import { NextResponse } from 'next/server'

export function middleware(request) {
  const requestHeaders = new Headers(request.headers)
  console.log(request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith('/about')) {
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    requestHeaders.set('x-add-header', 'about-header')
  }

  const response = NextResponse.next({
    headers: requestHeaders
  })

  return response
}
