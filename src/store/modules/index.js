const files = import.meta.glob('./*.js')

const modules = {}

for (const key in files) {
  const moduleName = key.replace('./', '').replace('.js', '')
  modules[moduleName] = files[key]
  modules[moduleName]['namespace'] = true // 对模块批量开启命名空间
}

export default modules
