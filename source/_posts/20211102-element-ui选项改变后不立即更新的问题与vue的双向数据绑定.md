---
title: element-ui选项改变后不立即更新的问题与vue的双向数据绑定
date: 2021-11-02 09:35:59
categories:
- 技术
- 前端
tags:
- 前端
- JavaScript
- Vue
---

## 现象

element-ui 下拉框选项改变后没有立即更新值，而是在下一个选项被选择之后，上一个选项的值才会被更新。查了资料最后确定应该是 Vue 的双向数据绑定上的问题，简单说就是如果直接更改对象，Vue 会对其中所有 key 进行监听，如果直接插入一个 key-value，则不会。

<!--more-->

## 关于创建方式

通过控制台打印一个对象，可以看见该对象被赋予的所有方法，包括 `getter` 和 `setter` 方法。

如果一个对象是这么创建的

``` js
this.obj = {
    key1: '1',
    key2: '2',
    key3: '3',
}
```

那么这三个 key 都会有相应的方法进行监听和修改。

![image-20211102094432670](D:\GitHub\zhyib.github.io\source\_posts\20211102-element-ui选项改变后不立即更新的问题与vue的双向数据绑定\image-20211102094432670.png)

可以看见所有 `key` 都有对应的 `getter` 和 `setter` 方法。



如果以这种形式创建两个 `key`

```javascript
this.obj = {
    key1: '1',
    key2: '2',
}
this.obj.key3 = '3';
this.obj['key4'] = '4';
```

那么后两个则不会有 `getter` 和 `setter` 方法

![image-20211102095042721](D:\GitHub\zhyib.github.io\source\_posts\20211102-element-ui选项改变后不立即更新的问题与vue的双向数据绑定\image-20211102095042721.png)

也就意味着如果 `key3` `key4` 发生改变，那么外部结构时不会感知到的，所以 element-ui 的选择框不会自动更新。



## 推测

推测是 Vue 的双向数据绑定的问题，它的底层实现可能是通过检测对象变化，然后对对象内的所有成员写了 `getter` 和 `setter` 方法。但是如果是通过 `obj.key1 = 'key1'; `增加的键值，由于对象本身并没有被改变，所以新增的键值没有 `getter` 和 `setter` 方法。



## Vue 的响应式添加属性

```javascript
this.obj = {
    key1: '1',
    key2: '2',
}
this.obj.key3 = '3';
this.set(this.obj, 'key4', '4');	// or Vue.set(object, key, value)
```

使用 Vue 自带的方法添加属性，用这个方法可以对新增的属性赋予 `getter` 和 `setter` 方法。

![image-20211102095925780](D:\GitHub\zhyib.github.io\source\_posts\20211102-element-ui选项改变后不立即更新的问题与vue的双向数据绑定\image-20211102095925780.png)

