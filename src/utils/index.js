// 获取随机 Hex 颜色
export function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

// 获取随机 RGB 颜色
export function getRandomRgbColor() {
  const random = () => Math.floor(Math.random() * 256)
  return `rgb(${random()}, ${random()}, ${random()})`
}

// RGB 颜色转 Hex 格式
export function RGBToHex(r, g, b) {
  return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')
}

// 获取变量的原始类型
export function getVariableRawType(variable) {
  return Object.prototype.toString.call(variable).split(' ')[1].replace(']', '').toLowerCase()
}

// 获取随机布尔值
export function getRandomBoolean() {
  return Math.random() >= 0.5
}

// 反转字符串
export function reverseString(str) {
  return str.split('').reverse().join('')
}

// 字符串重复指定次数
export function repeatString(str, count) {
  return new Array(count).fill(str).join('')
}

// 字符串首字母大写
export function upperStringFirst(str) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

// 深拷贝
export function deepClone(source) {
  // 当待拷贝数据为 null NaN undefined number string 等基本数据类型时直接返回
  if (!source || typeof source !== 'object') {
    return source
  }
  // Date 类型
  if (source instanceof Date) {
    const tmpDate = new Date()
    tmpDate.setTime(new Date().getTime())
    return tmpDate
  }
  // 正则类型类型
  if (source instanceof RegExp) {
    const Constructor = source.constructor
    return new Constructor(source)
  }
  // 如果是数组等引用数据类型
  const target = Array.isArray(source) ? [] : {}
  for (const key in source) {
    target[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key]
  }
  return target
}
