---
title: 行高line-height的用法
date: 2021-11-29 14:49:37
categories:
  - 技术
  - 前端
tags:
  - 前端
---

## 设定

字面意思，行高，是两行文字的基线之间的间距。可以看作为内容区的高度，和盒子的高度又有点[区别](#关于盒子高度)

假设行高 18px，字高 14px，那么剩下 4px 就会均分在字的上下 2px，同时这个与内间距 `padding` 又是两码事

## 值

可选的值有 `<number> | <length> | <percentage> | normal`

### normal

用户代理的默认值，与字体字号有关，通常会是字号的 1.1-1.2 倍高低，不同字号会有差异。例如

- 宋体、仿宋、楷体 - 1.14
- 微软雅黑 - 1.32
- Courier New - 1.13
- Consolas - 1.17
- Times - 1.15
- Arial - 1.15

也可以用这个来恢复默认，清除继承

<!--more-->

### length

长度值，定值，写多少是多少。如 `40px, 1.5rem, 0.8em`

### number | percentage

直接的数字和百分比用来通过当前字号来计算行高

```
font-size: 100px;
line-height: 0.9;
=> 90px

font-size: 100px;
line-height: 1.5;
=> 150px
```

## 关于盒子高度

![image-20211129151845087](image-20211129151845087.png)

如图，三行每行 `line-height: 1; font-size: 100px;` 可得总高 `300px`

接下来设定，三行所在 `div` 高度 `250px`，加背景色

可以看到文字内容是比整个盒子要高的，甚至下个盒子紧挨着这个盒子，造成了文字重叠的现象

所以结论是，**用 `line-height` 时需要注意盒子的高度 `height`**
