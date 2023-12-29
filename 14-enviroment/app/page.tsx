// app/page.js
export default function Page() {
  console.log(process.env.DB_HOST)
  console.log(process.env.DB_USER)
  console.log(process.env.DB_PASS)
  console.log(process.env.TWITTER_URL)
  /**
   * 环境变量加载顺序
   * process.env
    .env.$(NODE_ENV).local
    .env.local (当 NODE_ENV 是 test 的时候不会查找)
    .env.$(NODE_ENV)
    .env
   */
  return <h1>Hello World!</h1>
}
