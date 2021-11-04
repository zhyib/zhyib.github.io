---
title: 从window.location到URL
date: 2021-05-17 19:39:08
categories:
- 技术
- 前端
tags:
- 前端
- 网络
---

## window.location

location === window.location，记录的是浏览器URL的相关信息。

随手取了三个`window.location`，最后结合 [RFC 3986: Uniform Resource Identifier (URI): Generic Syntax @ ietf.org](https://datatracker.ietf.org/doc/html/rfc3986)来分析一下URL结构

<!--more-->

```json
{
    "ancestorOrigins": {},
    "href": "https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1",
    "origin": "https://developers.weixin.qq.com",
    "protocol": "https:",
    "host": "developers.weixin.qq.com",
    "hostname": "developers.weixin.qq.com",
    "port": "",
    "pathname": "/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html",
    "search": "",
    "hash": "#1"
}
```

```json
{
    "ancestorOrigins": {},
    "href": "https://cn.bing.com/search?q=location+search+%E5%8F%82%E6%95%B0&cvid=4f3c33331f6149e69d608f5e992a7ebe&aqs=edge..69i57.6173j0j1&pglt=163&FORM=ANNTA1&PC=U531",
    "origin": "https://cn.bing.com",
    "protocol": "https:",
    "host": "cn.bing.com",
    "hostname": "cn.bing.com",
    "port": "",
    "pathname": "/search",
    "search": "?q=location+search+%E5%8F%82%E.......",
    "hash": ""
}
```

```json
{
    "ancestorOrigins": {},
    "href": "http://localhost:4000/",
    "origin": "http://localhost:4000",
    "protocol": "http:",
    "host": "localhost:4000",
    "hostname": "localhost",
    "port": "4000",
    "pathname": "/",
    "search": "",
    "hash": ""
}
```



## URL结构

现在通常说的URL实际上是URI的一种，两者区别后面再说

[Syntax Components](https://datatracker.ietf.org/doc/html/rfc3986#section-3)

```
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
```

```
// location 中 URL 结构，全部由 RFC 3986 定义
href					// 完整的连接，Hypertext Reference
 |-origin				// 源，包括以下三项
 |  |-protocol			// scheme，相当于协议，如 http https
 |  \-host				// authority,相当于主机，包括主机名和端口
 |     |-hostname		// 主机名，可以是主机ip或字母组成的地址
 |     \-port			// 端口，没有就留空
 |-pathname				// path，路径名，相对于前半段地址的定位路径
 |-search				// query参数，【从第一个?开始到#为止】
 \-hash					// hash
```

当初面试的时候就被问到过，说怎么取当前页面URL，怎么取当前页面的查询参数，现在想来真是简单，只要使用`windows.location.xxx || location.xxx`即可得到，适当时需要一点字符串处理。



## URL的全部定义

关于authority还有一个完整的定义

```
authority = [ userinfo "@" ] host [ ":" port ]
```

也就是

```
// location 中 URL 结构，全部由 RFC 3986 定义
href                // 完整的连接，Hypertext Reference
 |-origin           // 源，包括以下三项
 |  |-userinfo      // userinfo
 |  |-protocol      // scheme，相当于协议，如 http https
 |  \-host          // authority,相当于主机，包括主机名和端口
 |     |-hostname   // 主机名，可以是主机ip或字母组成的地址
 |     \-port       // 端口，没有就留空
 |-pathname         // path，路径名，相对于前半段地址的定位路径
 |-search           // query参数，【从第一个?开始到#为止】
 \-hash             // hash
```

在这种模式下，也就是说，常见邮箱地址`example@mail.com`也是一个authority。



其实广义上的URL还包括更多东西，比如：

```
https://www.baidu.com/                              // https 地址
ftp://ftp.is.co.za/rfc/rfc1808.txt                  // ftp 地址
http://www.ietf.org/rfc/rfc2396.txt
ldap://[2001:db8::7]/c=GB?objectClass?one           // IPv6 地址
mailto:John.Doe@example.com                         // mailto协议，邮箱
news:comp.infosystems.www.servers.unix              // 迷之协议
tel:+1-816-555-1212                                 // 电话
telnet://192.0.2.16:80/                             // telnet 连接
ssh://git@github.com:zhyib/zhyib.github.io.git      // ssh 勉强可以算？不确定
```



## URI URL URN

Uniform Resource Identifier, URI，统一资源定位符

Uniform Resource Locators, URL，统一资源定位器

Uniform Resource Names, URN，统一资源名称



### 什么是URN

URI包括URL和URN，前者是通过地址定位资源，后者是通过名称定位资源。URN本被期待成为一种定位方式，与资源地址无关的一种方式。甚至当时设计中还有URC，character，特征来定位，后来被RFC替代。现在URN已经很少使用了，使用的几乎都是URL。



### URN的格式

来自[RFC 2141 @ ietf.org](https://datatracker.ietf.org/doc/html/rfc2141)，用正则来表示就是

```js
/^urn:[A-Za-z\d][A-Za-z\d\-]{1,31}:d]:[A-Za-z\d\符号]+$/
// '符号'包括 "(" | ")" | "+" | "," | "-" | "." | ":" | "=" | "@" | ";" | "$" | "_" | "!" | "*" | "'"
```

前半段`[A-Za-z\d][A-Za-z\d\-]{1,31}:d]`，Namespace Identifier(NID)，命名空间标识符

后半段`[A-Za-z\d\符号]+`，Namespace Specific String(NSS)，命名空间特定字符串，其中符号可以转为“%编码”

很少见，除了这个：

```
// 来自百度百科，改过hash
magnet:?xt=urn:btih:4D9FA761D69964BA05F23B3B0C9C1F968EA6C47D0&xt=urn:ed2k:7655dbacff9395e579c4c9cb49cbec0e&dn=bbb_sunflower_2160p_30fps_stereo_abl.mp4&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.publicbt.com%3a80%2fannounce&ws=http%3a%2f%2fdistribution.bbb3d.renderfarming.net%2fvideo%2fmp4%2fbbb_sunflower_2160p_30fps_stereo_abl.mp4
```

其中`xt`之后就是URN，`btih`为NID，后面的NSS。
