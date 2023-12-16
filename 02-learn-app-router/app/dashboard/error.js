'use client' // 错误组件必须是客户端组件
import { useEffect } from 'react'

/**
 * 输出效果：
 * <Layout>
 *  <ErrorBoundary fallback={<Error />}>
 *    <Page />
 * </ErrorBoundary>
 * </Layout>
 *
 * 当前只能捕获dashboard及其子页面的错误，不能捕获dashboard/layout.js， dashboard/template.js的错误
 */

export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* reset函数可以重新渲染子组件（如果错误是暂时的，就可以从错误中恢复） */}
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
