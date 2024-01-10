const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/docs',
  async headers() {
    return [
      /* -------------------------------- source匹配 -------------------------------- */
      {
        source: '/about',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value'
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value'
          }
        ]
      },
      // {
      //   // 匹配动态路由
      //   source: '/about/:user',
      //   headers: [
      //     {
      //       key: 'x-user',
      //       value: ':user' // 匹配参数在value中使用
      //     },
      //     {
      //       key: 'x-user-:user', // 匹配参数在key中使用
      //       value: 'my other custom header value'
      //     }
      //   ]
      // },

      // {
      //   // 通配符路径匹配
      //   source: '/blog/:slug*', // 会匹配 /blog/a, /blog/a/b, /blog/a/b/c 等
      //   headers: [
      //     {
      //       key: 'x-slug',
      //       value: ':slug*' // 匹配参数在value中使用
      //     },
      //     {
      //       key: 'x-slug-:slug*', // 匹配参数在key中使用
      //       value: 'my other custom header value'
      //     }
      //   ]
      // },

      // 正则匹配
      {
        source: '/blog/:post(\\d{1,})', // 会匹配 /blog/123, /blog/123456 等， 而不是 /blog/abc
        headers: [
          {
            key: 'x-post',
            value: ':post'
          }
        ]
      },
      /* -------------------------------- source匹配 -------------------------------- */

      /* ---------------------------------- 覆盖行为 ---------------------------------- */
      {
        source: '/:path*',
        headers: [
          {
            key: 'hello',
            value: 'hello'
          },
          {
            key: 'hello2',
            value: 'hello2'
          }
        ]
      },
      {
        source: '/hello', // 访问 /hello 时，有冲突的会覆盖上面的 /:path* 匹配，没有冲突的会合并
        headers: [
          {
            key: 'hello',
            value: 'world'
          },
          {
            key: 'hello3',
            value: 'hello3'
          }
        ]
      },
      /* ---------------------------------- 覆盖行为 ---------------------------------- */

      /* -------------------------------- basePath -------------------------------- */

      {
        source: '/with-basePath', // 匹配 /docs/with-basePath
        headers: [
          {
            key: 'x-hello',
            value: 'world'
          }
        ]
      },
      /* -------------------------------- basePath -------------------------------- */

      /* ------------------------------- has和missing ------------------------------ */
      // 如果 header 中 `x-add-header` 字段存在
      // 那就返回 `x-another-header` 标头
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-add-header'
          }
        ],
        headers: [
          {
            key: 'x-another-header',
            value: 'has x-add-header'
          }
        ]
      }
      // 如果 header 中 `x-no-header` 字段不存在
      // 就返回 `x-another-header` 标头
      // {
      //   source: '/:path*',
      //   missing: [
      //     {
      //       type: 'header',
      //       key: 'x-no-header'
      //     }
      //   ],
      //   headers: [
      //     {
      //       key: 'x-another-header',
      //       value: 'hello'
      //     }
      //   ]
      // },
      // 如果 source、query、cookie 都匹配
      // 就返回 `x-authorized` 标头
      // {
      //   source: '/specific/:path*',
      //   has: [
      //     {
      //       type: 'query',
      //       key: 'page',
      //       value: 'home'
      //     },
      //     {
      //       type: 'cookie',
      //       key: 'authorized',
      //       value: 'true'
      //     }
      //   ],
      //   headers: [
      //     {
      //       key: 'x-authorized',
      //       value: 'hello'
      //     }
      //   ]
      // },
      //如果 header 中 `x-authorized` 存在且等于 yes 或 true
      // 就返回 `x-another-header` 标头
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'header',
      //       key: 'x-authorized',
      //       value: '(?<authorized>yes|true)'
      //     }
      //   ],
      //   headers: [
      //     {
      //       key: 'x-another-header',
      //       value: ':authorized'
      //     }
      //   ]
      // },
      // 如果 host 是 `example.com`,
      // 应用 header
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'example.com'
      //     }
      //   ],
      //   headers: [
      //     {
      //       key: 'x-another-header',
      //       value: 'hello'
      //     }
      //   ]
      // }
      /* ------------------------------- has和missing ------------------------------ */
    ]
  },
  // Use the CDN in production and localhost for development.
  // 从 /_next路径（.next/static/文件夹）加载的 JavaScript 和 CSS 文件添加资源前缀。
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : undefined,
  // assetPrefix: 'https://cdn.mydomain.com'

  compress: true, // gzip压缩, 默认true

  devIndicators: {
    buildActivityPosition: 'bottom-right', // 构建指示器的位置
    buildActivity: true // 是否构建指示器
  },

  // distDir: 'build' // 构建输出目录, 默认 .next

  env: {
    customKey: 'my-value'
  }, // 通过 process.env.customKey 访问

  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true // 构建时忽略eslint错误
  },

  generateBuildId: async () => {
    // For example get the latest git commit hash here
    return process.env.GIT_HASH // 返回构建ID
  },

  generateEtags: true, // 是否生成etag, 默认true, 为每个页面生成一个etag

  httpAgentOptions: {
    keepAlive: true
  }, // http代理选项

  // images: {
  //   loader: 'imgix',
  //   loaderFile: './my/image/loader.js' // 使用云提供商优化图片而不是next.js内置的图像优化
  // },

  output: 'standalone', // Next.js 会自动在 .next中创建一个 standalone 文件夹，然后拷贝 node_modules 中生产部署会用到的所有必需文件。靠着这个文件夹，都不需要再次安装 node_modules 即可实现部署。

  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mjs', 'mdx'], // 支持的页面扩展名

  poweredByHeader: false, // 禁用 X-Powered-By 头

  productionBrowserSourceMaps: true, // 生产环境下生成source map, 默认false

  reactStrictMode: true, // 严格模式, 默认true

  trailingSlash: true, // 是否启用尾随斜杠, 默认false.false的情况下，/about/会重定向到 /about；true的情况下，/about 会重定向到 /about/

  transpilePackages: ['@acme/ui'], // 需要转译的包(比如使用了es6语法的包， 需要转译成es5)

  typescript: {
    ignoreBuildErrors: false // 构建时忽略ts错误, 默认false
  }
}

module.exports = nextConfig
