// middleware.js
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// let headers = { 'accept-language': 'en-US,en;q=0.5' }

// Negotiator将request对象作为参数传入，可以更方便获取请求头的首部字段信息
// let languages = new Negotiator({ headers }).languages()[('en-US', 'en')]

let locales = ['zh', 'en-US', 'nl-NL', 'nl']
let defaultLocale = 'en-US'
// 匹配出最适合的语言
// match(languages, locales, defaultLocale) // -> 'en-US'

/**
 *
 * @param {import('next/server').NextRequest} request
 * @returns
 */
const getLocale = (request) => {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' }
  let languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale)
}

/**
 *
 * @param {import('next/server').NextRequest} request
 * @returns
 */
export function middleware(request) {
  const { pathname } = request.nextUrl
  // 已经是访问对应语言的请求，则跳过
  const pathnameHasLocale = locales.some((l) => pathname.startsWith(`/${l}` || pathname === `/${locale}`))
  if (pathnameHasLocale) return

  // 获取匹配的locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  // 重定向到对应语言的路径
  return Response.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // 跳过所有内部路径 (_next)
    '/((?!_next).*)'
    // 可选: 仅在根 URL (/) 运行
    // '/'
  ]
}
