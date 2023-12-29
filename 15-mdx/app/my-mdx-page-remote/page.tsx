// app/my-mdx-page-remote/page.js
import { MDXRemote } from 'next-mdx-remote/rsc'
import ComponentA from '../components/a'

const components = { ComponentA }

// app/page.js
// 从服务端远程获取 MDX 内容
export default function Home() {
  // const res = await fetch('https://...')
  // const markdown = await res.text()
  return (
    <div>
      <MDXRemote
        source={`# Hello World
      This is from Server Components!
      with a component 
      <ComponentA />
      `}
        components={components}
      />
    </div>
  )
}
