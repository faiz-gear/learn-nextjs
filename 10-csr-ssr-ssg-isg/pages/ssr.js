// pages/ssr.js

/**
 * SSR 服务端渲染, 渲染工作在服务端执行
 * 由服务端发送数据请求，获取数据，然后将数据渲染到页面上，最后将渲染好的页面html文件发送给浏览器。
 */

export default function Page({ data }) {
  return <p>{JSON.stringify(data)}</p>
}

// 使用SSR, 需要导出一个异步函数 getServerSideProps， 这个函数会在每次请求页面时被调用， 返回的数据会作为 props 传递给页面组件
// export async function getServerSideProps() {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
//   const data = await res.json()

//   return { props: { data } }
// }
