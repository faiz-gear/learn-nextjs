// /dashboard/blog/page.js
import { notFound } from 'next/navigation'

/**
 * 访问 /dashboard/blog时，因为 page.js 丢出了 notFound 函数，所以会触发 not-found.js 的执行。
 * 但当访问 /dashboard/blog/1时，因为没有对应的路由处理程序，依然是默认的 not-found 效果
 */
async function fetchUser(id) {
  const res = await new Promise((resolve) =>
    setTimeout(() => resolve({ ok: true, json: () => ({ name: 'test', ok: false }) }), 3000)
  )
  if (!res.json().ok) return undefined
  return res.json()
}
export default async function Page() {
  const user = await fetchUser(1)

  if (!user) {
    notFound() // 进入当前路由自定义的not-found界面
  } else {
    return <div>{user.name}</div>
  }
}
