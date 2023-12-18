'use server'

import { revalidateTag } from 'next/cache'

export default async function action() {
  revalidateTag('collection') // 让所有带 collection 标签的 fetch 请求重新验证。
}
