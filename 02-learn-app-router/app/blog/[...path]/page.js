'use client'
// app/blog/[...path]/page.js：匹配值为 /blog/1、/blog/1/2、/blog/1/2/3等
// 如果存在app/blog/[id]/page.js， fang
// 动态路由
export default function Page({ params }) {
  return <div>My Post Path: {JSON.stringify(params)}</div>
}
