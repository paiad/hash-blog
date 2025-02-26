---
title: 🥕AList
createTime: 2025/02/24 17:36:28
tags:
   - AList
   - WebDAV
permalink: /article/x2mapzmu/
#excerpt:
#   <mark>Alist</mark>为用户通过统一界面管理本地和云存储（如阿里云盘、百度云盘），支持文件浏览、上传下载、预览和 WebDAV，适合自建服务的爱好者。
---
> Alist是一个开源工具，用 Go 和 Solidjs 开发，
> 帮用户通过统一界面管理本地和云存储（如阿里云盘、百度云盘），支持文件浏览、上传下载、预览和 WebDAV，适合自建服务的爱好者。
<RepoCard repo="AlistGo/alist" />

### Docker下载
docker cli
```bash
docker run -d --restart=unless-stopped -v /etc/alist:/opt/alist/data -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022 --name="alist" xhofe/alist:latest
```
---
进入容器内部，执行以下命令：
```bash
# 随机生成一个密码
docker exec -it alist ./alist admin random
# 手动设置一个密码,`NEW_PASSWORD`是指你需要设置的密码
docker exec -it alist ./alist admin set NEW_PASSWORD
```
记住上述生成的密码，登陆如下界面：
<ImageCard
image = "https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/docker-alist-e3.png"
/>

### Docker Desktop配置
<ImageCard 
image = "https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/docker-alist-e2.png"
width = 70% />

### 本地挂载百度网盘
#### 步骤向导
::: steps
1. Step1

    [本地挂载'百度网盘'文档](https://alist.nn.ci/zh/guide/drivers/baidu.html)
   
    另起页面，登陆网页版百度网盘

2. Step2

    [获取刷新Token](https://alist.nn.ci/tool/baidu/callback.html)


3. Step3

   访问AList网站: [http://localhost:5244](http://localhost:5244)

   进入管理页面：

   点击==管理==：
   <ImageCard
   image = "https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/docker-alist-e4.png"
   />
   <ImageCard
   image = "https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/docker-alist-e5.png"
   />

   点击==存储==，选择驱动"百度网盘"
   <ImageCard
   image = "https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/docker-alist-e6.png"
   />

    参考下方视频填写相关数据即可：
    @[artPlayer](https://r2.izyt.cc/alist/baidu/%E7%99%BE%E5%BA%A6%E5%AE%98%E6%96%B9%E6%8E%A5%E5%8F%A3.mp4)


:::

### 本地同步百度网盘
>在 RaiDrive 中配置 WebDAV 的目的是为了将支持 WebDAV 协议的远程存储挂载到你的电脑上，让它像本地磁盘一样使用。

勾选
- [x] Webdav 读取
- [x] Webdav 管理
<ImageCard
image = "https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/docker-alist-e7.png"
/>

@[bilibili](BV1ut4y1u7SM)

### 文件的上传与刷新
- 进入需要上传的文件夹，注意==主页==右下角有<Icon name = "icon-park:more-two"/>，其中有上传<Icon name = "hugeicons:cloud-upload"/>。
- 百度网盘上传文件后可以点击右下角<Icon name = "icon-park:more-two"/>， 在点击<Icon name = "tabler:refresh"/>之后，文件将显示同步后的状态。