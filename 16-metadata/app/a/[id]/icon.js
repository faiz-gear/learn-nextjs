// app/icon.js
import { ImageResponse } from 'next/og'

// 路由段配置
export const runtime = 'edge'

// 图片 metadata
export const size = {
  width: 32,
  height: 32
}
export const contentType = 'image/png'

// 图片生成
// 可以理解为特殊的路由处理程序
// 访问当前路由文件夹对应的路由时，会为当前路由生成icon
// <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
export default async function Icon({ params }) {
  return new ImageResponse(
    (
      // ImageResponse JSX 元素
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        {params.id}
      </div>
    ),
    // ImageResponse options
    {
      // 方便复用 size
      ...size
    }
  )
}
