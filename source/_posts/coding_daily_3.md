---
title: "[代码日记] 在游戏中为实体写一个AI"
author: NriotHrreion
categories:
- "代码日记"
tags:
- "开发"
- "javascript"
excerpt: "最近我写了一个贪吃蛇游戏, 我会把我觉得有意思的东西添加到游戏中.<br>这次我打算在里面添加幽灵."
date: 2021-12-05
---

在我朋友画好幽灵的贴图之后, 我就开始动工了. 在我的想法中, 幽灵应该要追着玩家跑, 至于要怎么追, 那就得为幽灵设计一个它专属的AI了.

这个幽灵的AI能控制幽灵的移动. 我让它先获取蛇头的坐标, 再获取幽灵自己的坐标, 然后通过比较x轴与y轴来确定相对的位置, 最后才来决定要转哪个方向.

但测试后, 我发现它跟得太紧了, 游戏难度大大增加, 那要怎么办呢?

我是这么做的: 在幽灵移动之前, 抽取随机数(-1, 0, 1), 加在幽灵要移动到的坐标上, 以此打乱幽灵的路径.

这样一来, 幽灵也就更像幽灵了, 游戏趣味大增.
