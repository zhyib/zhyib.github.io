---
title: typescript 项目配置总结
date: 2022-05-27 17:04:11
categories:
  - 技术
  - Node.js
tags:
  - Node.js
  - TypeScript
---

最近在写一个服务端应用，计划采用的技术栈是 TypeScript + Koa2 + MySQL，后续计划再安排上持续集成之类的。先写一下项目用到 TS 需要的配置内容，主要是路径别名部分



## 初始化与编译输出

- 安装 `tsc`
- `tsc --init` 初始化 ts 配置项
- 在**根目录**使用 `tsc` 编译**整个项目**，
- 低级错误：
  - 如果使用 `tsc index.ts` 编译，只能编译单个文件和它的依赖文件，不是标准 npm module，所以在使用 `import / export` 时会出错
  - 同时也不会使用目录下的 `tsconfig.js` 文件读取编译配置项



<!--more-->



## 路径别名

### eslint

- `lint --init` 初始化 eslint，在过程中会自动配置 ts 格式检查的相关依赖

- 安装 `npm i eslint-import-resolver-alias --save-dev`

  

``` js
  module.exports = {
    settings: {
      'import/resolver': {
        alias: {
          map: [['~', './src']],
          extensions: ['.tsx', '.ts', '.jsx', '.js'],
        },
      },
    },
  };
```

​	在 `.eslintrc` 配置，让 eslint 去读取 ts 后缀文件，同时配置路径别名，让 eslint 能够识别

### package.json

```json
{
    "_moduleAliases": {
        "@": "dist/src",
        "@src": "dist/src",
        "@controller": "dist/src/controller",
        "@entity": "dist/src/entity",
        "@mapper": "dist/src/mapper",
        "@service": "dist/src/service",
        "@util": "dist/src/util"
      }
}
```

注册别名，供运行时使用



### tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./", /* Specify the base directory to resolve non-relative module names. */
    "paths": {
        "@src/*": ["./src/*"],
        "@controller/*": ["./src/controller/*"],
        "@entity/*": ["./src/entity/*"],
        "@mapper/*": ["./src/mapper/*"],
        "@service/*": ["./src/service/*"],
        "@util/*": ["./src/util/*"],
    },
  }
}
```

注册别名，供 tsc 编译使用



### NodeJs

```bash
npm i module-alias --save
```

安装 `module-alias`



```ts
import 'module-alias/register';
```

在入口文件引用，就可以使用路径别名了



## 监听文件变化并自动重启服务

```bash
npm install nodemon
```

安装 nodemon



```json
{
    "scripts": {
        "build": "tsc",
        "serve": "nodemon ./dist/index.js"
    },
}
```

在 `package.json` 中配置，之后就使用 `npm run build` 编译，使用 `npm run serve` 启动并监听编译结果变化
