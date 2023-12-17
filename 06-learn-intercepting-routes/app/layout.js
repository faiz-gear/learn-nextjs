// app/layout.js
// 拦截路由
// 在/路由下,访问/photos/1,路由会被@modal下的/(.)photos/[id]/page拦截,然后渲染出来
/**
 * 拦截路由文件夹命名规则:
 * (.)表示匹配同一层级
 * (..)表示匹配上一层级
 * (..)(..)表示匹配上上层级
 * (...)表示匹配根目录
 */

export default function Layout({ children, modal }) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  )
}
