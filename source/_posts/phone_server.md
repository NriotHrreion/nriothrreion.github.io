---
title: 在旧手机上部署MC服务器
author: NriotHrreion
tags:
- "服务器"
- "开发"
- "Linux"
- "Minecraft"
photo: "/img/phone_server.jpg"
excerpt: "最近, 我找到了家里的一台旧手机, 于是就产生了一些奇妙的想法…<br><br>这篇文章记述了我改造旧手机的过程."
date: 2021-08-15
---

最近, 我找到了家里的一台旧手机, 于是就产生了一些奇妙的想法...

由于Android手机是基于Linux开发的, 所以只要有方法, 就可以把手机当作服务器来使用.

那该如何做呢?

我先在手机上下载了**Termux**, 这款应用是一款终端应用, 可以通过它和一些Linux指令来进行更深的操作.

打开Termux, 看到的是一个黑乎乎的界面, 接下来配置一下ssh远程连接, 就可以用电脑更方便地操作这台手机了.

```sh
# 下载openssh软件包
pkg install openssh
# 启动ssh服务
sshd
# 检查是否启动ssh服务, 如果列表里有ssh的话, 就是开启了
ps -e | grep ssh
# 查看ip地址(为接下来的远程连接做准备)
ifconfig
```

接着, 在电脑里的cmd窗口中输入: `ssh root@{刚刚看到的ip地址} -p 8022`

这样, 就在电脑上连接并登录上了手机的终端了.

下一步要安装java环境.

安装java环境有两种方式, 一种是直接用**wget**获取jdk, 另一种是用pkg指令下载安装java软件包, 我选择了后者:

```sh
pkg install openjdk-17
```

接下来, 就是下载MC服务端了. 我在官网下载了1.17版本的服务端jar包, 下载好之后简单配置了一下. 然后输入下面的指令来启动服务器:

```sh
java -Xmx2048M -Xms2048M -jar server.jar nogui
```

上面的命令中, 我给MC服务端分配了2GB的运行内存, 如果你想要让更多玩家一起来玩你的服务器, 那你可以自己调大这个数字(即命令中的`Xmx2048`和`Xms2048`).

为了让其他玩家加入服务器, 你还需要一个公网IP或者是一个内网穿透工具. 因为我没有公网IP, 所以我果断选择了后者.

> 我在这里使用了[Sakurafrp](https://natfrp.com), 如果你实在找不到合适的内网穿透工具, 不妨试试它

最后, 打开Minecraft, 进入服务器, 就可以和朋友一起玩了.

~~这也代表着一台旧手机重获了新生~~
