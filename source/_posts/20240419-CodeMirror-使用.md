---
title: CodeMirror 使用
date: 2024-04-19 09:55:49
categories:
  - 技术
  - 前端
tags:
  - 前端
  - Packages
---

CodeMirror 是一款网页中的代码编辑器，能提供例如高亮、缩进、行号、自动补全、语法检查等基础功能

> https://codemirror.net/

<!-- more -->

## 安装

```bash
# 安装必要组件
npm install codemirror
npm install @codemirror/view
npm install @codemirror/state

# 安装选装组件 实际上都是必要组件的间接依赖
npm install @codemirror/lang-sql
npm install @codemirror/commands
npm install @codemirror/autocomplete
```

## 使用

```js
import { EditorView, keymap} from '@codemirror/view';
import { acceptCompletion } from '@codemirror/autocomplete'
import { basicSetup } from 'codemirror';
import { sql } from '@codemirror/lang-sql';

const sqlBlock = document.getElementById('sql-block');
const editorView = new EditorView({
  extensions: [
    // 导入默认配置 包括键位映射 已经行号 括号高亮等
    basicSetup,
    // 指定语言
    sql(),
    // 增加监听器 回调赋值
    EditorView.updateListener.of((e) => {
      sqlstring = e.state.doc.toString();
    }),
    // Tab 自动补全
    keymap.of([
      key: 'Tab', run: acceptCompletion ,
    ]),
  ],
  // 初始化文本
  doc: sqlstring,
  // 指定挂载点
  parent: sqlBlock,
});

// 如果需要显式变更
editorView.dispatch({
  changes: [{
    from: 0,
    to: editorView.viewState.state.doc.toString().length,
    insert: 'text',
  }],
});

// 如果需要销毁
editorView.destroy();
```

## 代码检查功能

Codemirror 内置代码检查接口，但是需要外部工具配套使用。

且外部工具必须能运行在浏览器 js 中

> https://juejin.cn/s/codemirror%206%20lint%20example
