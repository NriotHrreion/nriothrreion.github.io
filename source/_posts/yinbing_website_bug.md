---
title: 发现某反mc网站的bug
author: NriotHrreion
tags:
- "开发"
- "网站"
- "javascript"
excerpt: "这篇文章叙述了我在我偶然发现的一个反mc论坛网站中发现bug的过程."
---

这篇文章叙述了我在我偶然发现的一个反mc论坛网站中发现bug的过程.

最近刷B站的时候看到了一个反mc的人发的视频, 点进去他的主页看到他开了一个网站: [https://yinbing.space](https://yinbing.space)

于是我心情激动地就点了进去, 没想到在那个网站注册和登录的时候发生了一些奇怪的事情.

在我登录账号的时候, 点击登录按钮便会提示"网络错误", 重新试过几次都是这样, 所以我就抱着试试的心态打开了`devtools`.

下好断点, 调试了几次之后, 我终于发现了问题之所在!

原来是他的源码中, 发起了一个xhr post请求, 而这个请求发送过去之后收到了一个错误的responseText.

这个responseText里面是json格式的, 但是在最后结尾的地方漏掉了一个大括号, 于是导致了报错.

至于为什么会报"网络错误", 是因为在那个xhr对象的onload函数里面, 有一个try catch语句, try语句中使用了`JSON.parse`来将那个responseText转换为`object`形式. 但恰好那个responseText有格式错误, 所以执行了catch语句中的代码.

**这个错误的根源或许在服务端中, 服务端给客户端代码返回了一个错误的东西而导致它报错. 要想修复它, 最好的办法就是在服务端中好好地找一找有没有什么地方是错的.**