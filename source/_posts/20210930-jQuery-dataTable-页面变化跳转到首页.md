---
title: jQuery dataTable 页面变化跳转到首页
date: 2021-09-30 22:02:57
categories:
- 技术
- 前端
tags:
- 前端
- JavaScript
- bootstrap
---
由于最近的业务原因，又开始使用 jQuery，jQuery 的组件虽然丰富，但是感觉不太协调，各管各的，配置起来也比较麻烦，这里先说个遇到的问题

业务场景是这样的，需要在页面显示数量变更的时候自动切换到第一页，但是如果是默认的配置不会有这样的功能。

<!--more-->


``` javascript
$(document).ready(function () {
    $('#example').dataTable({
        ajax() {
            // 要前往的页码
            let cuttPageParam = Math.ceil(data.start / data.length) + 1;
            if (currPageSize !== data.length) {
                // 当前 pageSize 与期望不符
                // pageSize 变化
                // 查询用参数初始化
                pageChange = true;
                currPageSize = data.length;
                data.start = 1;
                currPageParam = 1;
            }
            let param = {
                // 使用一个动态的 pageSize
                currPage: currPageParam,
                pageNum: data.length,
            }
            $.ajax({
                ...
            })
        }
        ...
        // 当表格重绘就会调用这个回调
        fnDrawCallback(data) {
            if (pageChange) {
                // 判断确实存在 pageSize 变化
                pageChange = false;
                oTable.fnPageChange(0);
            }
        }
    });
});
```

虽然是个笨办法，但是确实解决了问题。不知道有没有更好的解决方案。
