'use client'
// app/blog/[[...slug]]/page.js：相当于app/blog/[...slug]/page.js的可选匹配, 匹配值为 /blog、/blog/1、/blog/1/2、/blog/1/2/3等
// 如果存在app/blog/[id]/page.js， fang
// 动态路由
export default function Page({ params }) {
  return <div>My Shop Path: {JSON.stringify(params)}</div>
}
