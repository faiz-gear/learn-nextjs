'use client'
// app/blog/[id]/page.js： 匹配/blog/1、/blog/2、/blog/3等
// 动态路由
export default function Page({ params }) {
  return <div>My Post Id: {params.id}</div>
}
