---
title: 🐳Docker
createTime: 2025/02/16 17:03:52
permalink: /article/rbe4xwwo/
tags:
  - Docker
---
## Docker
>Docker 是一个开源平台，用于容器化应用程序。它将应用及其依赖打包成一个轻量级、可移植的容器，可以在任何环境中一致运行。

## Relevant Website
==Docker Desktop Download:==
<CardGrid>
    <LinkCard icon="skill-icons:docker" title="Docker Desktop" href="https://www.docker.com/get-started/"></LinkCard>
</CardGrid>

==Docker Hub==
<CardGrid>
    <LinkCard icon="skill-icons:docker" title="Docker Hub" href="https://hub.docker.com/"></LinkCard>
</CardGrid>

## Run a new container
<CardGrid>
    <ImageCard
    image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/docker-options.png"
    width = 120%
    title="Options"/>
    <div>Docker 容器配置中的几个可选参数：<br>
    1. Container name：容器名称。若不提供，Docker 会随机生成一个。<br><br>
    2. Ports：配置端口映射，将容器的某个端口映射到宿主机的某个端口，允许外部访问容器服务。<br><br>
    3. Volumes：设置数据卷，用于将容器内的路径与宿主机路径关联，实现数据持久化。<br><br>
    4. Environment variables：配置环境变量，为容器内的应用传递配置参数。</div>
</CardGrid>

>[!note]
>docker run --name mysql-container -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydb mysql:latest
> - Container name: mysql-container
> - Ports: 容器3306端口 --> 映射到宿主机端口3306
> - Environment variables: my-secret-pw为MySQL的root用户密码; mydb为MySQL数据库名称
> - Image: mysql:latest为镜像名称

## Volumes Configuration
Docker Desktop中的Volumes有两种主要类型：
>1. **命名卷（Named Volumes）**：
>    - Docker自动管理的存储卷，数据保存在Docker指定的地方。
>    - 使用时通过名称引用，数据不会因容器删除而丢失。
>
>2. **主机卷（Host Volumes）**：
>    - 将宿主机目录挂载到容器中，数据直接存储在宿主机文件系统上。
>    - 容器和宿主机共享数据，适用于需要直接访问宿主机文件的情况。
>
>   >[!important]
>    > 命名卷由Docker管理，适合持久化数据；主机卷则直接与宿主机文件系统关联，适用于共享文件。命名卷写名称；主机卷写宿主机路径。


