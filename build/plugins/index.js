import vue from '@vitejs/plugin-vue2'
import { registerCompressionDist } from './compression.dist'
import { registerCompileHtml } from './compile.html'
import { registerImageMini } from './image.mini'

export function generateVitePlugins(viteEnv = {}, isBuild = false) {
  const plugins = []

  /** 提供对 Vue 2 的单文件组件支持 */
  plugins.push(vue({ include: [/\.vue$/] }))

  /** 提供打包为 gzip 的压缩文件支持 */
  plugins.push(registerCompressionDist())

  /** 针对 index.html，提供压缩和基于 ejs 模板功能，亦可对其注入动态数据 */
  plugins.push(registerCompileHtml(viteEnv, isBuild))

  if (isBuild) {
    /** 图片压缩插件，使用简单，重要的是它真的很快 🚀🚀🚀🚀 */
    plugins.push(registerImageMini())
  }

  return plugins
}
