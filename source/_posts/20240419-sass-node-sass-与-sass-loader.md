---
title: sass node-sass 与 sass-loader
date: 2024-04-19 16:12:58
lang: zh-CN
categories:
  - 技术
  - 前端
tags:
  - 前端
  - Packages
  - Node.js
---

Sass 是流行的 CSS 的拓展语言，用过的工具有 sass、node-sass 和 sass-loader，相互之间有联系，配置的时候又经常遇到问题。简单总结一下。

## sass 和 node sass

这两放在一起，因为都是 sass 编译工具。从本质上提供了对 sass 语法以及各类特性的支持。

<!-- more -->

### sass

> Github: [link](https://github.com/sass/dart-sass)
>
> npm: [link](https://www.npmjs.com/package/sass)

原名/别名 dart sass，是由 dart 语言编写的 sass 工具，是目前比较主流和推荐的 sass 语言支持。遇到的坑也比较少。

#### 语法的 Deprecated Warning 问题

在高版本的 sass 编译旧的 scss 文件可能会存在过时语法的 warning，比如使用 element-ui 时：

```
Deprecation Warning: $weight: Passing a number without unit % (0) is deprecated.
To preserver current behavior: $weight * 1%
More info: https://sass-lang.com/d/function-units
…
```

本质是语法过旧，在新版本的 sass 中不推荐。当然能够升级 element 更好，但是在无法升级的情况下，参考[官方说明](https://sass-lang.com/d/function-units)，把 sass 版本改到标记 `deprecated` 的版本以下，如 `sass@~1.30.0`

### node-sass

> Github: [link](https://github.com/sass/node-sass)
>
> npm: [link](https://www.npmjs.com/package/node-sass)

底层由 C++ 编写，据称能提供更快的运行效率。但由于开发者没有更多精力维护，所以处于 `deprecated` 状态。因为不再提供更多的新功能支持，所以建议开发者尽快迁移到其它 sass 支持工具。官方说明：

> [Libsass is deprecated](https://sass-lang.com/blog/libsass-is-deprecated)

#### 兼容性问题

它需要对应版本的 node 支持，支持表在上面的 npm 项目主页链接里。

#### 其它依赖问题

还有个问题是 node-sass 安装时会自动拉一个二进制文件，当拉不到时会尝试本地编译，此时往往会报错。所以还需要新增对 `sass_binary_site` 的配置，如：

```bash
npm config set sass_binary_site="https://cdn.npmmirror.com/binaries/node-sass
```

## sass-loader

> npm: [link](https://www.npmjs.com/package/sass-loader)

**Loads a Sass/SCSS file and compiles it to CSS.**

所以应该是一个连接 dart sass/node sass 和 webpack 项目的工具，同时，开发者推荐：

> Note
>
> We highly recommend using Dart Sass.

所以新项目的节奏应该是 dart sass + sass-loader。具体的配置参考 npm 页面
