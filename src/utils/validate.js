// 校验是否为手机号
export const isPhone = phone => /^1[3-9]\d{9}$/.test(phone)

// 校验是否为邮箱
export const isEmail = email => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)

// 校验是否为 QQ 号码
export const isQQ = qq => /^[1-9]\d{4,10}$/.test(qq)

// 校验是否为十六进制颜色值
export const isHexColor = color => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)

// 校验是否为外链
export const isExternal = path => /^(https?:|mailto:|tel:)/.test(path)

// 检验是否为 IPv4 地址
export const isIPv4 = ip => /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(ip)

// 校验对象是否为空
export const isEmptyObject = obj => Object.keys(obj).length === 0
