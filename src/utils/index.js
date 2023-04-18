/**
 * 获取随机 Hex 颜色
 * @returns {string} #f1f1f1
 */
export function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

/**
 * 获取随机 RGB 颜色
 * @returns {string} rgb(150, 150, 150)
 */
export function getRandomRgbColor() {
  const random = () => Math.floor(Math.random() * 256)
  return `rgb(${random()}, ${random()}, ${random()})`
}

/**
 * RGB 颜色转 Hex 格式
 * @param {number} r 红色
 * @param {number} g 绿色
 * @param {number} b 蓝色
 * @returns {string} #f1f1f1
 */
export function RGBToHex(r, g, b) {
  return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')
}

/**
 * 获取变量的原始类型
 * @param {any} variable 任意数据类型
 * @returns {string} string | number | array | date ...
 */
export function getVariableRawType(variable) {
  return Object.prototype.toString.call(variable).split(' ')[1].replace(']', '').toLowerCase()
}

/**
 * 获取随机布尔值
 * @returns {boolean} true | false
 */
export function getRandomBoolean() {
  return Math.random() >= 0.5
}

/**
 * 反转字符串
 * @param {string} str 准备进行反转的字符串
 * @returns {string} 反转后的字符串
 */
export function reverseString(str) {
  return str.split('').reverse().join('')
}

/**
 * 字符串重复指定次数
 * @param {string} str 准备进行重复的字符串
 * @returns {string} 重复后的字符串
 */
export function repeatString(str, count) {
  return new Array(count).fill(str).join('')
}

/**
 * 字符串首字母大写
 * @param {string} str 准备进行首字母大写的字符串
 * @returns {string} 首字母大写后的字符串
 */
export function upperStringFirst(str) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

/**
 * 深拷贝，支持日期、正则、函数
 * @param {[key:string]: any} source 拷贝数据源
 * @returns {[key:string]: any} 拷贝后的数据源
 */
export function deepClone(source) {
  if (!source || typeof source !== 'object') return source
  if (source instanceof Date) return new Date(source)
  if (source instanceof RegExp) return new RegExp(source)
  const target = Array.isArray(source) ? [] : {}
  for (const key in source) {
    target[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key]
  }
  return target
}
