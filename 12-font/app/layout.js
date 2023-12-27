import './globals.css'
// app/layout.js
// 1. 导入想要使用的字体
import { Fugaz_One, Montserrat } from 'next/font/google'

// 2. 实例化字体对象，设置使用子集等
// const inter = Fugaz_One({
//   subsets: ['latin'],
//   weight: '400' // Fugaz_One不是可变字体，需要设置weight粗细程度
// })
const inter = Montserrat({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  weight: ['400', '700'], //
  style: ['italic', 'normal']
})

//  3. 应用，inter.className 会返回一个只读的 CSS 类名用于加载字体
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
