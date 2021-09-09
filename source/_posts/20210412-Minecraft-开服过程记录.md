---
title: Minecraft 开服过程记录
date: 2021-04-12 18:47:06
categories:
- 技术
- 摸鱼技术
tags:
- MC
- 服务器
---

> 注：该sudo就sudo

## 安装 Java

安装 openjdk8

```sh
apt-get install openjdk-8-jdk
```

<!--more-->

## 下载服务端核心

直接调用轮子，因为需要安装mod，使用了这个MCBBS上推荐的服务端

[Releases · Luohuayu/CatServer (github.com)](https://github.com/Luohuayu/CatServer/releases)



## 指令

### 启动

Set max and min ram size for jvm.

```sh
java -Xmx1000M -Xms800M -XX:+AggressiveOpts -jar jar_file
```



###  scp 指令

从本地上传文件到远程

```sh
scp local_file [remote_username@]remote_ip:remote_folder [-r]
```



### pscp 指令

从远程下载文件到本地

```sh
pscp [remote_username@]remote_ip:remote_folder local_file [-r]
```



### 修改.sh文件权限

```
chmod -R 777 fiel_name
```



### 防火墙

[Linux防火墙开放端口 - 简书 (jianshu.com)](https://www.jianshu.com/p/dc49ed9fbfcf)

```
systemctl status firewalld    ##查看火墙状态
systemctl start firewalld     ##开启火墙服务
systemctl stop firewalld      ##关闭火墙服务

firewall-cmd --permanent --zone=trusted --add-port=25565/tcp
firewall-cmd --permanent --zone=trusted --add-port=25565/udp

# 25565 is the default port for minecraft server.
```

**使用`trusted`而不是`public`**