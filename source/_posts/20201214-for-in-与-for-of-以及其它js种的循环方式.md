---
title: for...in 与 for...of 以及其它js中的循环方式
date: 2020-12-14 20:50:06
categories:
- 技术
- JavaScript
tags:
- JavaScript
---

记录一下对几种循环方式的学习笔记。



## for ... in

一句话概括，`for ... in` 是对索引的循环。

索引，对于数组和字符串而言就是`0 - n`，对于对象而言就是对象的`key`

```javascript for ... in
let a = [1, 2];
let b = {'-1' : 1, '-2' : 2};
let c = 'xyz'

for (let i in a) {console.log(i)}	// '0', '1'
for (let i in b) {console.log(i)}	// '-1'. '-2'
for (let i in c) {console.log(i)}	// '0', '1', '2'
```

<!-- more -->

## for ... of

`for ... of` 是对**迭代器**的循环，也就是说，只有**目标具有迭代器**的时候才能使用它进行循环。而拥有迭代器的有，`Array, TypedArray, String, Map, Set, argument`.所以`Object`是不能使用`for ... of`的。

迭代器的内容是，数组的值，字符串的字符等

```javascript for ... of
let a = [1, 2];
let b = {'-1' : 1, '-2' : 2};
let c = 'xyz'

for (let i in a) {console.log(i)}	// 1, 2
for (let i in b) {console.log(i)}	// Uncaught TypeError: b is not iterable
for (let i in c) {console.log(i)}	// 'x', 'y', 'z'
```



## forEach

`forEach`是内置的方法，只有`Array, TypedArray, Map, Set`可以使用，是对值的循环。

重点是`forEach`使用了箭头函数，所以若有`return`，是没有效果的。

```javascript forEach
let a = [1, 2];
let b = {'-1' : 1, '-2' : 2};
let c = 'xyz'

a.forEach((item) => {console.log(item)})	// 1, 2
b.forEach((item) => {console.log(item)})	// Uncaught TypeError: b.forEach is not a function
c.forEach((item) => {console.log(item)})	// Uncaught TypeError: c.forEach is not a function
```



## Objects.keys() Objects.values() and Objects.entries()

这三者虽然不是循环，但是是一种进行循环的手段。这三者会取目标对应的`key/value/entry`并作为数组返回。

像`Object`本身无法循环，但是如果使用以上三者，就可以在返回的数组中读取对应的内容。

```javascript Objects.()
let b = {'-1' : 1, '-2' : 2};

Object.keys(b).forEach((item) => {console.log(item)})		// '-1', '-2'
Object.values(b).forEach((item) => {console.log(item)})		// 1, 2
Object.entries(b).forEach((item) => {console.log(item)})	// [ '-1', 1 ], [ '-2', 2 ]
```



## 原型链

提一嘴这个，以上两个`for`都会对继承而来的属性进行访问（至少eslint不推荐我用），附一个属性可见性参考链接

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties