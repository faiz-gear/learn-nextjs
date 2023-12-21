// /pages/ssg3/[id].js
export default function Blog({ post }) {
  return (
    <>
      <header>{post.title}</header>
      <main>{post.body}</main>
    </>
  )
}

// 构建时在服务端请求接口生成动态路由
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { id: String(post.id) }
  }))

  // { fallback: false } 意味着当访问其他路由的时候返回 404
  return { paths, fallback: false }
}

// 构建时在服务端生成动态路由的数据
export async function getStaticProps({ params }) {
  // 如果路由地址为 /posts/1, params.id 为 1
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post = await res.json()

  return { props: { post } }
}
