import { compression } from 'vite-plugin-compression2'

export function registerCompressionDist() {
  return compression({
    algorithm: 'gzip', // 压缩算法 gzip | brotliCompress | deflate | deflateRaw
    threshold: 1024 * 10, // 如果体积大于阈值，则进行压缩，单位为 b，1kb = 1024b
    deleteOriginalAssets: false, // 压缩后是否删除源文件
  })
}
