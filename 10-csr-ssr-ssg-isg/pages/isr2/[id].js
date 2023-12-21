// pages/post/[id].js
export default function Blog({ post }) {
  // 10s内的刷新，页面内容不会变化； 10s后的第一次刷新，会使用之前的HTML，但是会开始构建新的HTML； 10s后的第二次刷新，会使用新的HTML
  return (
    <>
      <header>{post.title}</header>
      <main>{post.body}</main>
    </>
  )
}

// fallback 的模式改为 'blocking'
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  const paths = posts.slice(0, 10).map((post) => ({
    params: { id: String(post.id) }
  }))

  // getStaticPaths 函数的返回为return { paths, fallback: 'blocking' }。
  // 它表示构建的时候就渲染 paths 里的这些路径。如果请求其他的路径，那就执行服务端渲染。
  // SSG 的例子中，设置 fallback为 false，它表示如果请求其他的路径，就会返回 404 错误。
  return { paths, fallback: 'blocking' }
}

// 使用这种随机的方式模拟数据改变
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// 多返回了 revalidate 属性
export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomInt(100)}`)
  const post = await res.json()

  /**
   * 在初始请求后和接下来的 10 秒内，页面都会使用之前构建的 HTML。
   * 10s 后第一个请求发生的时候，依然使用之前编译的 HTML。但 Next.js 会开始构建更新 HTML，从下个请求起就会使用新的 HTML。
   * （如果构建失败了，就还是用之前的，等下次再触发更新）
   */
  return {
    props: { post },
    revalidate: 10
  }
}
