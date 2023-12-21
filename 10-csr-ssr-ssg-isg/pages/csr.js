// pages/csr.js
import React, { useState, useEffect } from 'react'
/**
 * CSR 客户端渲染, 渲染工作在客户端执行
 * 浏览器会先下载一个非常小的 HTML 文件和所需的 JavaScript 文件。在 JavaScript 中执行发送请求、获取数据、更新 DOM 和渲染页面等操作。
 * 这样做最大的问题就是不够快。（SEO 问题是其次，现在的爬虫已经普遍能够支持 CSR 渲染的页面）
 *
 * 两种方式实现客户端渲染
 * 一种是在页面中使用 React useEffect hook
 * 第二种方法是在客户端使用数据获取的库比如 SWR 见（csr2.js）
 */

export default function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    }

    fetchData().catch((e) => {
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])

  return <p>{data ? `Your data: ${JSON.stringify(data)}` : 'Loading...'}</p>
}
