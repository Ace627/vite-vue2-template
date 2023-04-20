import axios from 'axios'

/**
 * 文件的服务器 url 地址
 * @param {string} url 必须是文件的 url
 * @returns {Promise<blob>} 转换后的 blob 数据流
 */
export async function linkToBlob(url) {
  const resposne = await axios.get(url, { responseType: 'blob' })
  return resposne.data
}

/**
 * 利用 a 标签实现数据下载
 * @param {blob} 待下载数据的 blob 格式
 * @param {string} fileName 下载文件的名称 || 默认是时间戳
 */
export function aLinkDownload(blob, fileName) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = fileName || new Date().getTime().toString()
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/**
 * 根据文件 URL 下载任意文件
 * @param {string} fileURL 服务器返回的文件 url
 * @param {string} fileName 文件名。建议携带格式后缀 .png .txt .docx
 */
export async function downloadAnyFile(fileURL, fileName) {
  const fileBlob = await linkToBlob(fileURL)
  aLinkDownload(fileBlob, fileName)
}
