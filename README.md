# Vite + Vue2 项目骨架

## 项目拉取

```bash
# 克隆项目
git clone https://github.com/Ace627/vite-vue2-template

# 进入项目目录
cd vite-vue2-template

# 安装依赖
# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install

# 启动服务
npm run dev
```

## 技术栈

Vite、Vue2、VueRouter、Vuex、Sass、Axios

## 内置功能

- 设置 @ 指向 src 目录
- Vuex 模块的自动引入
- 对 axios 进行的的简易二次封装
- 页面路由切换时添加顶部进度条提示
- 浏览器默认样式的重置 reset.scss
- 对 CSS 浏览器前缀的自动补全，以兼容旧浏览器
- 打包后自动移除 console 与 debugger

## 目录架构

```bash
|-src                               # 项目的源代码目录
| |-config                            # 配置文件
| | |-permission.js                     # 权限配置文件
| |-store                             # 全局状态管理 Vuex
| |-styles                            # 全局样式
| | |-_reset.scss                       # 重置样式表
| | |-index.scss                        # 全局样式的入口文件
| |-utils                             # 全局通用方法
| | |-auth.js                           # 对 Token 的读、写、删的封装
| | |-request.js                        # 对 axios 的二次封装
| |-App.vue                           # 全局唯一根组件
| |-main.js                           # 项目的入口文件
|-.gitignore                        # Git 提交时的忽略文件的配置
|-.npmrc                            # npm 镜像源的配置文件
|-.prettierignore                   # Prettier 格式化插件忽略文件的配置
|-.prettierrc                       # Prettier 格式化插件的配置
|-README.md                         # 项目的描述文件
|-vite.config.js                    # vite 构建工具的配置
```
