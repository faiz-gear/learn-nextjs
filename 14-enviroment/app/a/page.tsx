'use client'

export default function Page() {
  console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID)
  console.log(process.env.NEXT_PUBLIC_TWITTER_URL)

  const varName = 'NEXT_PUBLIC_ANALYTICS_ID'
  // 使用变量动态查找会找不到，因为浏览器获取环境变量是构建的时候将所有NEXT_PUBLIC_开头的变量都写入到js文件中，而不是在运行时获取
  console.log('使用变量动态查找', process.env[varName])

  return <h1>Hello a</h1>
}
