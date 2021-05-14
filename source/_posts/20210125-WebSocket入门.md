---
title: WebSocket入门
date: 2021-01-25 21:09:58
categories:
- 技术
- 前端
tags:
- JavaScript
- 前端
---

简单地了解了一下WebSocket，做一下总结

## 什么是 WebSocket

一种可以类比HTTP的应用层协议，与HTTP、HTTP类似，也有WS和WSS



## WS 的特点

为什么使用WS。

HTTP有他的劣势，即只能由客户端发起请求，然后由服务器回应。如果没有WS，就需要使用HTTP发起轮询——以固定时间间隔向服务器查询是否有新消息。

这样势必有一个问题，比如客户端接收直播弹幕，若由客户端频繁发起查询，必将带来大量冗余流量，所以B站的直播弹幕协议使用的是WS。

WS就相当于开启了一个长连接通道，客户端与服务器可以随时收发消息，是一种全双工模式。

> 什么是单工、半双工、全工通信？
>
> 信息只能单向传送为单工；
> 信息能双向传送但不能同时双向传送称为半双工；
> 信息能够同时双向传送则称为全双工。

<!--more-->

## WS 简单使用

```javascript
var ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = function(evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets!');
};

ws.onmessage = function(evt) {
  console.log('Received Message: ' + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log('Connection closed.');
};
```

浏览器可以直接运行，如果在node上执行，需要安装，之后`require`/`import`

```sh
npm install ws
```



| 方法                    | 功能                                     |
| ----------------------- | ---------------------------------------- |
| new WebSocket(url)      | WS构造函数，返回一个WS对象               |
| webSocket.onopen()      | WS连接成功后的回调                       |
| webSocket.onclose()     | WS连接关闭后的回调                       |
| webSocket.onerror()     | WS出错的回调                             |
| webSocket.send(content) | 使用WS发送消息，可以是字符串或二进制对象 |
| webSocket.close()       | 关闭WS                                   |



## WS 与 HTTP 2.0

HTTP/2 虽然也支持 Server Push，但是服务器只能主动将资源推送到客户端缓存！并不允许将数据推送到客户端里跑的 Web App 本身。服务器推送只能由浏览器处理，不会在应用程序代码中弹出服务器数据，这意味着应用程序没有 API 来获取这些事件的通知。

- 为了接近实时地将数据推送给 Web App， HTTP/2 可以结合 SSE（Server-Sent Event）使用。
- SSE，服务端推送事件，是通过 HTTP 长连接进行信息推送的一个功能。它首先由浏览器向服务端建立一个 HTTP 长连接，然后服务端不断地通过这个长连接将消息推送给浏览器。



## F12

![image-20210125215030670](image-20210125215030670.png)

在F12中查看WS，可以看到上行下行内容，图中例子是WSS，所以是经过加密的。



## 参考链接

> [WebSocket 教程 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2017/05/websocket.html)