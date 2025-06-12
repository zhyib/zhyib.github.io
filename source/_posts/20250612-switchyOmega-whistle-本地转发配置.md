---
title: SwitchyOmega whistle 本地转发配置
date: 2025-06-12 10:22:14
categories:
  - 技术
  - 前端
tags:
  - 技术
  - 前端
---

由于在本地开发时需要获取测试环境的 Cookie，之前一般使用两种方法

- 把测试环境的 Cookie 修改到本地
- 调整 host 文件，把测试环境的域名指向`127.0.0.1`

两者都有点繁琐，而且后者依赖对 host 文件的权限，所以考虑换一套方案

## 安装 SwitchyOmega 和 whilstle

- SwitchyOmega 是一个浏览器插件，请使用通常安装插件的方式安装
- whilstle `npm install whistle -g`，随后按照提示操作，通常它会把服务开在`127.0.0.1:8899`

<!-- more -->

## 原理

- 所有的浏览器流量，首先通过 SwitchyOmega 插件做全局转发到`127.0.0.1:8899`
- 在 whilstle 上配置规则，将需要的地址转发到本地开发环境，其余的会自动不做处理

## 配置

- SwitchyOmega
  - 新建情景模式 代理服务器配置 `127.0.0.1:8899`
- whistle 新增规则如下

```
http://test.com:8080/api ignore://http
http://test.com:8080/web http://localhost:8080/
http://test.com:8080/ http://localhost:8080/
```

- 第一行表示忽略所有的后端请求，不做处理
- 第二行的地址代表测试环境的网页地址 `http://test.com:8080/web/#/` 浏览器访问这个地址时会下载 `index.html`入口文件，配置之后相当于连接到本地
- 第三行表示将所有的剩余请求，也就是前端资源请求，包括.js .css .vue 以及图片和 node_modules 中的资源，都转发到本地开发环境

### 注意

- vite.config.js 文件中，`base`属性的值为`./`，表示所有的资源请求，包括前端资源请求，以及后端请求，都从根路径开始，即一三行
- vite.config.js 文件中，已配置了 `proxy` 属性转发到后端测试环境所以不需要做额外处理，即第一行
- vite.config.js 中，配置

```js
defineConfig({
  // ...
  server: {
    host: "127.0.0.1", // 必须配置，不然 127.0.0.1:8080 不通
    port: 8080,
    hmr: {
      // 避免 vite hmr 报错
      protocal: "ws",
      host: "127.0.0.1",
    },
    // ...
  },
  // ...
});
```
