import { NextResponse } from 'next/server'

const isAuthenticated = false

// 3.1.定义中间件
export function middleware(request) {
  // 3.4处理cookie
  request.cookies.set('nextjs', 'fast')
  let allCookies = request.cookies.getAll()
  request.cookies.delete('nextjs')
  allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

  // 访问/about/xxx时重定向到/home
  // return NextResponse.redirect(new URL('/home', request.url))

  // 设置 cookies
  // const response = NextResponse.next({
  //   request: {}
  // })
  // response.cookies.set('vercel', 'fast')
  // response.cookies.set({
  //   name: 'vercel',
  //   value: 'fast',
  //   path: '/'
  // })

  // 3.5处理headers
  //  clone 请求标头
  // const requestHeaders = new Headers(request.headers)
  // requestHeaders.set('x-hello-from-middleware1', 'hello')
  // const response = NextResponse.next({
  //   request: {
  //     headers: requestHeaders
  //   }
  // })
  // // 设置新响应标头
  // response.headers.set('x-hello-from-middleware2', 'hello')

  // return response

  // 3.6 直接返回响应
  // 调用认证函数检查请求
  if (!isAuthenticated) {
    // 返回一端带有错误信息的 JSON 数据
    return new NextResponse(JSON.stringify({ success: false, message: 'authentication failed' }), {
      status: 401,
      headers: { 'content-type': 'application/json' }
    })
  }
}

// 3.2.设置匹配路径
export const config = {
  /**
   * 路径必须以 /开头
支持使用命名参数(named parameters)，比如/about/:path匹配 /about/a和 /about/b，但是不匹配 /about/a/c。
命名参数可以使用修饰符，比如 /about/:path*匹配 /about/a/b/c因为 * 表示 0 个或 1 个或多个，?表示 0 个或 1 个，+表示 1 个或多个
也可以使用标准的正则表达式替代， /about/(.*) 等同于 /about/:path*
   */
  matcher: '/about/:path*'
  /**
   * 支持数组形式
   */
  // matcher: ['/about/:path*', '/dashboard/:path*'],
}
