import { resolve } from 'path' // path 模块提供了一些工具函数，用于处理文件与目录的路径
import { defineConfig, loadEnv } from 'vite' // 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from '@vitejs/plugin-vue2' // 提供对 Vue 2 的单文件组件支持
import autoprefixer from 'autoprefixer' // 自动补全 CSS 浏览器前缀，以兼容旧浏览器
import { compression } from 'vite-plugin-compression2' // 提供打包为 gzip 的压缩文件支持
import { warpperEnv } from './build' // 引入对环境变量的处理函数

/** 当前执行 node 命令时文件夹的地址（工作目录） */
const root = process.cwd()
/** 路径拼接函数，简化代码 */
const pathResolve = (path) => resolve(root, path)

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const VITE_ENV = warpperEnv(loadEnv(mode, root, 'VITE_')) // 对原生环境变量进行二次处理
  const isBuild = command === 'build' // 当前是否是生产模式

  return {
    /** 部署应用包时的基本 URL */
    base: VITE_ENV.VITE_PUBLIC_PATH,

    plugins: [
      vue(),
      compression({
        algorithm: 'gzip', // 压缩算法 gzip | brotliCompress | deflate | deflateRaw
        threshold: 1024 * 10, // 如果体积大于阈值，则进行压缩，单位为 b，1kb = 1024b
        deleteOriginalAssets: false, // 压缩后是否删除源文件
      }),
    ],

    resolve: {
      alias: [
        /** 设置 `@` 指向 `src` 目录 */
        { find: '@', replacement: pathResolve('src') },
      ],
    },

    server: {
      /** 设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址 */
      host: true,
      /** 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口 */
      port: VITE_ENV.VITE_SERVER_PORT,
      /** 端口被占用时，是否直接退出 | 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口 */
      strictPort: false,
      /** 是否自动打开浏览器 */
      open: VITE_ENV.VITE_AUTO_OPEN,
      /** 是否允许跨域 */
      cors: true,
      /** 反向代理配置（主要是开发时用来解决跨域问题） */
      proxy: {
        [VITE_ENV.VITE_BASE_API]: { target: VITE_ENV.VITE_BASE_URL, changeOrigin: true },
      },
    },

    build: {
      outDir: VITE_ENV.VITE_OUTPUT_DIR, // 指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整
      assetsDir: 'assets', // 指定生成静态资源的存放目录。默认值为 assets ，可根据需要进行调整
      assetsInlineLimit: 4096, // 图片转 base64 编码的阈值。为防止过多的 http 请求，Vite 会将小于此阈值的图片转为 base64 格式
      chunkSizeWarningLimit: 500, // 规定触发警告的 chunk 大小。（以 kbs 为单位）
      cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
      sourcemap: false, // 构建后是否生成 source map 文件
      copyPublicDir: true, // 是否在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中
      minify: 'esbuild', // 指定使用哪种混淆器。默认为 esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%
      rollupOptions: {
        /** 配置打包文件分类输出 */
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          /** JavaScript 最小化拆分包 让打开那个页面，加载那个页面的 js ，让其之间的关联足够小 */
          manualChunks(id) {
            id.includes('node_modules') && id.toString().split('node_modules/')[1].split('/')[0].toString()
          },
        },
      },
    },

    /** 打包后移除所有的 console、debugger */
    esbuild: {
      drop: VITE_ENV.VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
  }
})
