---
title: 🧊Github图床
createTime: 2025/02/02 21:01:59
permalink: /article/409fidtz/
tags:
   - Picgo
---
>图床: 一个用于存储和管理图片文件的在线服务平台。
> 
>PicGo: 一个用于快速上传图片并获取图片 URL 链接的工具

::: steps
1. Step1 

    下载Picgo (Install Picgo)

   >Github: [PicGo](https://github.com/Molunerfinn/PicGo)
   >
   >Download:
   >
   > [PicGo-Setup-2.4.0-beta.9.exe](https://github.com/Molunerfinn/PicGo/releases)(Windows用户无脑下载)
   >
   >[PicGo-2.4.0-beta.9-arm64.dmg](https://github.com/Molunerfinn/PicGo/releases)(适用于的M1/M2的Mac设备)
   >
   >[PicGo-2.4.0-beta.9-x64.dmg](https://github.com/Molunerfinn/PicGo/releases)(适用于Intel芯片的macOS设备)
   >
   >[PicGo-2.4.0-beta.9.AppImage](https://github.com/Molunerfinn/PicGo/releases)(适用于Linux系统)
2. Step2 

   初始化你的Github的公共仓库 (Initialize your own Github public repository)
3. Step3

   配置Github token (Configure GitHub Token)
   1. 点击右上角头像
   2. 点击 "Setting"
   3. 点击 "Developer setting"
   4. 点击 "Personal access tokens"
   5. 点击 "Personal access tokens" 并生成一个新的 token，确保勾选 "`repo`" 权限
   6. 生成的token注意copy，仅出现一次
   
4. Step4
   
   按需配置Picgo (Configure Picgo according to requirements)
  <ImageCard
   image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/picgo_eg.jpg"
   width = 80%
   center= true
   />
5. Step5
   >因为网络原因，直接访问github上的图片很慢，所以用jsDeliver进行托管，这样国内网站可以快速的加载图片。

   picgo中设置自定义域名：<Badge type="tip" text="https://cdn.jsdelivr.net/gh/用户名/仓库名@分支名" />
    
   示例Example：<Badge type="tip" text="https://cdn.jsdelivr.net/gh/username/PictureBed@main/image/xyz.png" />
:::