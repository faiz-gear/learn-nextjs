// app/page.js

/**
 * nextjs拓展了原生的fetch Web API,增加了缓存和重新验证功能, 可以在服务端组件\路由处理程序\Server Actions中使用
 */

async function getData() {
  // 1.1缓存数据
  // const res = await fetch('https://dog-api.kinduff.com/api/facts', {
  //   cache: 'force-cache' // 默认缓存, 但是在路由处理程序中使用的POST请求不会缓存
  // })

  // 1.2重新验证
  // const res = await fetch('https://dog-api.kinduff.com/api/facts', {
  //   next: {
  //     revalidate: 5000 // 1.2.1基于时间的重新验证,单位为s
  //   }
  // })

  const res = await fetch('https://dog-api.kinduff.com/api/facts', {
    next: {
      tags: ['collection'] // 1.2.2按需重新验证.使用按需重新验证，在路由处理程序或者 Server Action 中通过路径（ revalidatePath） 或缓存标签 revalidateTag 实现。
    }
  })
  // 如果在尝试重新验证的过程中出现错误，缓存会继续提供上一个重新生成的数据，而在下一个后续请求中，Next.js 会尝试再次重新验证数据。

  // 1.3退出数据缓存
  /**
   * fetch 请求添加了 cache: 'no-store' 选项
   * fetch 请求添加了 revalidate: 0 选项
   * fetch 请求在路由处理程序中并使用了 POST 方法
   * 使用headers 或 cookies 的方法之后使用 fetch请求
   * 配置了路由段选项 const dynamic = 'force-dynamic'
   * 配置了路由段选项fetchCache ，默认会跳过缓存
   * fetch 请求使用了 Authorization或者 Cookie请求头，并且在组件树中其上方还有一个未缓存的请求
   */

  if (!res.ok) {
    // 这会触发最近的 `error.js` 错误边界
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  console.time()
  const data = await getData()
  console.timeEnd()

  return <main></main>
}

export const revalidate = 3600 // 1.2.1基于时间的重新验证, 会应用于路由段所有的fetch请求

// 2.服务端使用第三方请求库(见app/item/[id]/layout.js])
// 也不是所有时候都能使用 fetch 请求，如果你使用了不支持或者暴露 fetch 方法的三方库（如数据库、CMS 或 ORM 客户端），但又想实现数据缓存机制，那你可以使用 React 的 cache 函数和路由段配置项来实现请求的缓存和重新验证。

// 3. 客户端使用路由处理程序
// 如果你需要在客户端组件中获取数据，可以在客户端调用路由处理程序。路由处理程序会在服务端被执行，然后将数据返回给客户端，适用于不想暴露敏感信息给客户端（比如 API tokens）的场景。
// 如果你使用的是服务端组件，无须借助路由处理程序，直接获取数据即可。

// 4.客户端使用三方请求库
// 你也可以在客户端使用三方的库如 SWR 或 React Query 来获取数据。这些库都有提供自己的 API 实现记忆请求、缓存、重新验证和更改数据。

// 5. 建议与最佳实践
/**
 * 5.1. 尽可能在服务端获取数据
 * 尽可能在服务端获取数据，这样做有很多好处，比如：
可以直接访问后端资源（如数据库）
防止敏感信息泄漏
减少客户端和服务端之间的来回通信，加快响应时间
 * 5.2. 在需要的地方就地获取数据
如果组件树中的多个组件使用相同的数据，无须先全局获取，再通过 props 传递，你可以直接在需要的地方使用 fetch 或者 React cache 获取数据，不用担心多次请求造成的性能问题，因为 fetch 请求会自动被记忆化。这也同样适用于布局，毕竟本来父子布局之间也不能传递数据。
...
 * 5.3. 适当的时候使用 Streaming
Streaming 和 Suspense都是 React 的功能，允许你增量传输内容以及渐进式渲染 UI 单元。页面可以直接渲染部分内容，剩余获取数据的部分会展示加载态，这也意味着用户不需要等到页面完全加载完才能与其交互。
 * 5.4. 串行获取数据
数据请求相互依赖，形成瀑布结构，这种行为有的时候是必要的，但也会导致加载时间更长。
 * 5.5. 并行数据请求
请求同时发生并加载数据，这会减少加载数据所需的总时间
 * 5.6. 预加载数据(https://juejin.cn/book/7307859898316881957/section/7309076949182709811?utm_source=course_list#heading-17)
防止出现串行请求的另外一种方式是使用预加载。你可以创建一个 preload 函数进一步优化并行数据获取。
 * 5.7. 使用 React cache server-only 和预加载模式(https://juejin.cn/book/7307859898316881957/section/7309076949182709811?utm_source=course_list#heading-18)
 */
