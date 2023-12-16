'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { memo, useState } from 'react'

const dashboardRoutes = [
  {
    label: 'About',
    path: '/dashboard/about'
  },
  {
    label: 'Setting',
    path: '/dashboard/setting'
  },
  {
    label: 'Blog',
    path: '/dashboard/blog'
  }
]

const DashboardLayout = memo(({ children }) => {
  const [count, setCount] = useState(0)
  const [isError, setIsError] = useState(false)
  const pathname = usePathname()

  // 用在客户端组件中
  const router = useRouter()

  return (
    <div>
      {/* <div>
        <Link href="/dashboard/about">About</Link>
        <Link href="/dashboard/setting">Setting</Link>
      </div>
      <h1 className="">DashboardLayout: {count}</h1>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button> */}
      <ul>
        {dashboardRoutes.map((route) => {
          const isActive = pathname === route.path
          return (
            <li key={route.label} className={isActive ? 'text-blue' : 'text-black'}>
              {/* scroll false 代表位置之前的滚动距离 */}
              <Link href={route.path} scroll={false}>
                {route.label}
              </Link>
            </li>
          )
        })}
      </ul>
      <div> {pathname}</div>
      <button onClick={() => router.push('/dashboard', { scroll: false })}>回到dashboard</button>
      <div>{children}</div>

      {/* <div>{isError ? Error() : <button onClick={() => setIsError(true)}>get dashboard layout error</button>}</div> */}
    </div>
  )
})
DashboardLayout.displayName = 'DashboardLayout'

export default DashboardLayout
