---
title: JS toFixed 精度问题
date: 2021-10-14 13:22:24
categories:
- 技术
- 前端
tags:
- JavaScript
---

需求是遇到一个需要保留两位小数，但是出现了预期之外的结果

``` javascript
(15.845).toFixed(2);		// 15.85
(16.845).toFixed(2);		// 16.84
```

显然是不符合四舍五入规则的，最后的原因在官方文档中已写明，而且根本不是特殊的四舍五入规则的原因。

<!--more-->

## 官方文档

[Number.prototype.toFixed() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

> **Warning:** 浮点数不能精确地用二进制表示所有小数。这可能会导致意外的结果，例如 `0.1 + 0.2 === 0.3` 返回 `false` .

所以问题就是出在浮点数的精度问题。由于浮点数表示法导致在四舍五入运算上出现了问题



## 合理的算法

``` javascript
function toFixedNew(num, dig) {
    const multi = Math.pow(10, dig);
    return Math.round(num * multi) / multi;
}
```

比较简单的写法，没有考虑 `undefined`, `NaN` 之类的情况，

因为 `Math.round()` 是严格按照 0.5 进行取舍。



> [ECMAScript 2015 Language Specification – ECMA-262 6th Edition (ecma-international.org)](https://262.ecma-international.org/6.0/#sec-number.prototype.tofixed)
>
> ESMA 6 标准 中的 toFixed，有点复杂