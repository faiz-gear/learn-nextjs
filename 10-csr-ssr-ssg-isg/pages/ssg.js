// pages/ssg1.js

/**
 * SSG 静态站点生成
 * 在构建阶段，就将页面编译为静态的 HTML 文件，这样在请求页面时，就不需要再去构建页面，直接返回静态的 HTML 文件即可。
 * 当不获取数据时，默认使用的就是SSG
 *
 * 需要获取数据时，需要导出一个异步函数 getStaticProps， 这个函数会在构建时被调用， 返回的数据会作为 props 传递给页面组件
 * 分两种情况：
 * 页面内容需要获取数据，比如博客的文章内容需要调api获取（见ssg2.js）
 * 页面路径需要获取数据，比如数据库有100篇文章，不可能定义100个路由，这时候就需要动态路由（见/ssg3/[id].js）
 */
function About() {
  return <div>About</div>
}

export default About
