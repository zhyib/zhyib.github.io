---
title: Electron Webview内嵌Webpack4项目不兼容
date: 2025-09-15 11:02:22
categories:
  - 技术
  - 前端
tags:
  - 技术
  - 前端
  - Electron
---

具体场景是在使用 Electron 开发的桌面端应用中，使用 Webview 内嵌其它项目网页，初始化网页时报错`xxx.split() is undefined` 导致白屏。根因是 Webpack4 间接依赖 `pbkdf2` 包中有错误代码，导致在 Electron 的 Node 环境中不兼容。

## 根本原因

应用加载白屏报错 `xxx.split() is undefined`，排查根因发现这个报错来自底层依赖 `pbkdf2` 包。这个包由 `webpack@4` 引用，用于加解密功能。引用链路如下：

<!-- more -->

```text
-- webpack@4.47.0
  `-- node-libs-browser@2.2.1
    `-- crypto-browserify@3.12.1
      +-- browserify-sign@4.2.3
      | `-- parse-asn1@5.1.7
      |   `-- pbkdf2@3.1.3 deduped
      `-- pbkdf2@3.1.3
```

经过查询 Github 以及 Issues，早先有人已经提出了问题，并且提交了 Pull Request 但是没有人处理，疑似项目已经放弃维护。

该项目在更新版本 3.1.2 时，修改代码引入了错误如下：

![20250828221012_7375_74.png](20250828221012_7375_74.png)

原代码在第5行检查 `process.version` 是否存在，若存在则执行 `process.version.split()`。但是在这次commit中，第五行被修改为检查 `global.process.version` 存在，但是未修改 `process.version.split()` 方法。在 Electron 的 Node 环境中，恰好有 `global.process.version`，但是不存在 `process.version`，因此报错。

## 解决方法

最一劳永逸的方案是直接升级至 Webpack5，因为 Webpack5 不存在对这个包的依赖关系。但是通常来说，项目的打包工具不方便修改，因此采用的方案是发布并使用一个私有包，手动将这行的代码修改正确，即 `global.process.version.split()`。

## 关于 `global`

`global` 是一个全局对象，在 Node 中，`global` 对象是 Node 的全局对象，它包含 Node 的全局变量。在浏览器中，全局变量是 `globalThis` `window` `self` `frames`，四者相等。

> 在以前，从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 `window`、`self` 或者 `frames` 取到全局对象，但是在 Web Workers 中，只有 `self` 可以。在 Node.js 中，它们都无法获取，必须使用 global。
> 
> `globalThis` 提供了一个标准的方式来获取不同环境下的全局 `this` 对象（也就是全局对象自身）。不像 `window` 或者 `self` 这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 `globalThis`，不必担心它的运行环境。为便于记忆，你只需要记住，全局作用域中的 `this` 就是 `globalThis`。
>
> Reference: [globalThis](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

