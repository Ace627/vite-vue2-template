import { resolve } from 'path' // path 模块提供了一些工具函数，用于处理文件与目录的路径
import { defineConfig, loadEnv } from 'vite' // 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from '@vitejs/plugin-vue2' // 提供对 Vue 2 的单文件组件支持
import autoprefixer from 'autoprefixer' // 自动补全 CSS 浏览器前缀，以兼容旧浏览器

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: './',

    plugins: [vue()],

    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'), // 设置 `@` 指向 `src` 目录
      },
    },

    css: {
      postcss: {
        plugins: [
          // 请使用 package.json 中的 browserslist 字段来编辑需要适配的浏览器清单
          autoprefixer(),
        ],
      },
    },

    server: {
      host: true, // 设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
      port: 5173, // 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口
      strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      open: true, // 是否在开发服务器启动时，自动在浏览器中打开应用程序
    },

    build: {
      outDir: 'dist', // 指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整
      assetsDir: 'assets', // 指定生成静态资源的存放目录。默认值为 assets ，可根据需要进行调整
      assetsInlineLimit: 4096, // 图片转 base64 编码的阈值。为防止过多的 http 请求，Vite 会将小于此阈值的图片转为 base64 格式
      chunkSizeWarningLimit: 500, // 规定触发警告的 chunk 大小。（以 kbs 为单位）
      cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
      sourcemap: false, // 构建后是否生成 source map 文件
      copyPublicDir: true, // 是否在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中
      minify: 'terser', // 指定使用哪种混淆器。默认为 esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%
      terserOptions: {
        compress: {
          drop_console: true, // 正式环境移除 console
          drop_debugger: true, // 正式环境移除 debugger
        },
      },
    },
  }
})
