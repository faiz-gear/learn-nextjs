import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * 1.1GET请求
 * 1.2支持方法:支持 GET、POST、PUT、PATCH、DELETE、HEAD 和 OPTIONS 这些 HTTP 请求方法
 * 1.3参数:每个请求方法的处理函数会被传入两个参数，一个 request，一个 context 。两个参数都是可选的。
 * 1.4缓存: 使用Response对象的GET请求返回结果默认会缓存
 *  这些情况下会退出缓存:
 *    ①使用Request对象某些参数会退出缓存
 *    ②使用POST方法
 *    ③使用如 cookies、headers 这样的动态函数：
 *    ④使用基于底层 Web API 的抽象来读取 cookie （NextRequest）也会导致退出缓存
 *    ⑤路由段配置项中声明了动态模式
 */

export const dynamic = 'force-dynamic' // 强制动态模式, 会导致缓存退出

/**
 * @param {import('next/server').NextRequest} request 是基于Web Request API的扩展，包含了一些额外的属性
 * request.nextUrl: 包含了当前请求的URL信息, 是基于Web URL API的扩展
 * @param {import('next/server').NextRequestContext} context context 只有一个值就是包含当前动态路由参数的对象{params}
 */
export async function GET(request, context) {
  // const res = await fetch('https://dog-api.kinduff.com/api/facts')
  // const fetchData = await res.json()

  // 2.1获取查询参数
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries())

  // 2.2处理Cookie
  const token = request.cookies.get('token') // 读取
  const cookieStore = cookies() // 只读全局cookies实例
  await cookieStore.set('token', 'abcdef')
  const newToken = cookieStore.get('token').value

  // 2.3处理headers
  // 读取
  // const headersList = new Headers(request.headers)
  const headersList = headers() // 只读全局headers实例
  const referer = headersList.get('referer')

  // 2.4重定向
  // redirect('https://nextjs.org/')

  const data = {
    message: 'Hello Nextjs!',
    request,
    context,
    // fetchData,
    searchParams,
    referer
    // requestBody
  }

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Set-Cookie': `token=${newToken}; path=/; HttpOnly`, // 写入cookie到客户端
      referer, // 写入头部字段到响应
      // 2.6 CORS设置
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}

/**
 * @param {import('next/server').NextRequest} request 是基于Web Request API的扩展，包含了一些额外的属性
 * request.nextUrl: 包含了当前请求的URL信息, 是基于Web URL API的扩展
 * @param {import('next/server').NextRequestContext} context context 只有一个值就是包含当前动态路由参数的对象{params}
 */
export async function POST(request, context) {
  // 2.5获取请求体内容
  const headersList = headers()
  console.log(headersList.get('content-type'))

  // json数据
  // const res = await request.json()

  // formData数据
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const res = {
    username,
    password
  }

  return NextResponse.json({ res })
}
