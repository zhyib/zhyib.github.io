---
title: bootstrap 的 modal 模态框开关
date: 2021-10-09 14:19:11
categories:
- 技术
- 前端
tags:
- JavaScript
- bootstrap
---

简单记个笔记

### 模态框的开启

使用 `data-toggle` 和 `data-target` 或 `data-toggle` 和 `href` 的组合

``` html
<button
        data-toggle="modal"
        data-target="#modal-id"
        >
    按钮
</button>
```

或者

<!--more-->

```html
<button
        data-toggle="modal"
        #href="#modal-id"
        >
    按钮
</button>
```

### 模态框的关闭

使用 `data-dismiss` 关闭当前模态框

```html
<div id="modal-id">
    ...
    <button data-dismiss="modal">
        关闭
    </button>
</div>
```

