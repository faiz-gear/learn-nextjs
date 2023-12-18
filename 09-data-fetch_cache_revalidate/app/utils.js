import { cache } from 'react'

/**
 * 也不是所有时候都能使用 fetch 请求，如果你使用了不支持或者暴露 fetch 方法的三方库（如数据库、CMS 或 ORM 客户端），但又想实现数据缓存机制，那你可以使用 React 的 cache 函数和路由段配置项来实现请求的缓存和重新验证。
 */
export const getItem = cache(async (id) => {
  // 缓存数据库的请求
  const item = await db.item.findUnique({ id })
  return item
})

export const revalidate = 3600 // 最多每小时重新验证一次
