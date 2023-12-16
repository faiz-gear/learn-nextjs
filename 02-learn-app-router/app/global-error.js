'use client'
// app/global-error.js
/**
 *  顶层捕获根布局和根模版的error, 会替换根布局的内容， 也要定义html和body
 */
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
