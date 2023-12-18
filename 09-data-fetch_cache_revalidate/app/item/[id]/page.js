// app/item/[id]/layout.js
import { getItem } from '@/app/utils'

export const revalidate = 3600 // 最多每小时重新验证一次

export default async function Layout({ params: { id } }) {
  // getItem 被调用两次，但只会产生一次数据库查询。
  // const item = await getItem(id)
  // ...
}
