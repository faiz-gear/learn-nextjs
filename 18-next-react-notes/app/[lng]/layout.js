// app/[lng]/layout.js
import { locales } from '@/config'
import './style.css'
import Sidebar from '@/components/Sidebar'
import { Footer } from '@/components/Footer'

// 构建时生成静态路由
export async function generateStaticParams() {
  return locales.map((lng) => ({ params: { lng } }))
}

export default async function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">
            <Sidebar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
          <Footer lng={lng} />
        </div>
      </body>
    </html>
  )
}
