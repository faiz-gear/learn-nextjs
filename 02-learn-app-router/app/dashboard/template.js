'use client'

import { useState } from 'react'

/**
 * 输出效果：
 *
 * <Layout>
 * 模板需要给一个唯一的 key，模板中的状态不会保持
 * <Template key={routeParam}>{children}</Template>
 * </Layout>
 */
export default function Template({ children }) {
  const [count, setCount] = useState(0)
  return (
    <>
      {/* <h1>Template: {count}</h1> */}
      {/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
      {children}
    </>
  )
}
