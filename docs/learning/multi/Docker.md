---
title: 🐳Docker
createTime: 2025/02/16 17:03:52
permalink: /article/rbe4xwwo/
tags:
  - Docker
---
### Docker
>Docker 是一个开源平台，用于容器化应用程序。它将应用及其依赖打包成一个轻量级、可移植的容器，可以在任何环境中一致运行。

官网： [Docker](https://docs.docker.com)

- 镜像（image）：相当于一个模板，通过这个模板可以创建多个容器
- 容器（container）：通过镜像进行创建，容器化应用程序
- 仓库（repository）：存放镜像的地方

>[!important]
> Docker的工作机制：
> Docker的守护进程运行在宿主机上，可以通过宿主机的与其端口映射，访问到所创建的docker容器。
### Docker Hub
>[Docker Hub](https://hub.docker.com/) 是 Docker 官方提供的一个云平台，用于存储和分享 Docker 镜像。
> 它是 Docker 的中央仓库，用户可以在上面查找、下载、上传自己的 Docker 镜像。

### Docker下载(CentOS)
CentOS安装Docker： [Install Docker Engine on CentOS](https://docs.docker.com/engine/install/centos/)

>1. 卸载旧版本Docker
>```shell
>sudo yum remove docker \
>                  docker-client \
>                  docker-client-latest \
>                  docker-common \
>                  docker-latest \
>                  docker-latest-logrotate \
>                  docker-logrotate \
>                  docker-engine
>```
>
>2. 设置 Docker 仓库
>```shell
>sudo yum -y install yum-utils
>sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
>```
>
>3. 安装 Docker
>```shell
>sudo yum install docker-ce docker-ce-cli containerd.io
>```
>
>4. 启动 Docker 服务
>```shell
>sudo systemctl start docker
>sudo systemctl enable docker
>```
>
>5. 验证 Docker 安装
>```shell
>sudo docker --version
>```
>
>6. 测试运行hello-world容器
>```shell
>docker run hello-world
>``` 
>![img](https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/docker-e2.jpg)
> >[!tip]
> >若出现 如下错误：
> ![img](https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/docker-e1.jpg)
> >可尝试如下解决方法（配置镜像加速地址）：
> > ```shell
> >sudo mkdir -p /etc/docker
> >sudo tee /etc/docker/daemon.json <<-'EOF'
> >{
> >"registry-mirrors": [
> >"https://do.nark.eu.org",
> >"https://dc.j8.work",
> >"https://docker.m.daocloud.io",
> >"https://dockerproxy.com",
> >"https://docker.mirrors.ustc.edu.cn",
> >"https://docker.nju.edu.cn"
> >]
> >}
> >EOF
> >sudo systemctl daemon-reload
> >sudo systemctl restart docker
> >systemctl status docker
> >```

### 关于Docker的常见命令
下面是您提供的 Docker 命令的 Markdown 表格格式：

| 命令                                     | 描述                                                        |
|----------------------------------------|-----------------------------------------------------------|
| `docker info`                          | 显示 Docker 系统的详细信息                                         |
| `docker version`                       | 查看 Docker 版本                                              |
| `docker images`                        | 查看镜像                                                      |
| `docker pull xxx[:tag(版本)]`            | 下载镜像（不写版本，默认下载 latest）                                    |
| `docker rmi -f [IMAGE-ID]`             | 删除镜像                                                      |
| `docker ps`                            | 查看容器                                                      |
| `docker run [可选参数] image`              | 运行容器（可选参数：`--name` 设置容器名字，`-d` 后台运行，`-it` 交互方式，`-p` 端口映射） |
| `docker exec -it container_id /bin/bash` | 进入容器内部                                                    |
| `exit/Ctrl + P + Q`                    | 停止容器并退出/不停止容器退出                                           |
| `docker rm container-id`               | 删除指定容器                                                    |
| `docker start container-id`            | 启动容器                                                      |
| `docker restart container-id`          | 重启容器                                                      |
| `docker stop container-id`             | 停止容器                                                      |
| `docker kill container-id`             | 强制停止容器                                                    |

### 暴露端口，访问容器
1. 开放阿里云安全组端口8080
2. 配置宿主机防火墙8080
3. 映射容器端口80到宿主机端口8888


### Docker Desktop
#### Docker Desktop下载
<CardGrid>  
    <LinkCard icon="skill-icons:docker" title="Docker Desktop" href="https://www.docker.com/get-started/"></LinkCard>
</CardGrid>

#### Run a new container
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

### Volumes Configuration
Docker Desktop中的Volumes有两种主要类型：
>1. **命名卷（Named Volumes）**：
    >    - Docker自动管理的存储卷，数据保存在Docker指定的地方。
>    - 使用时通过名称引用，数据不会因容器删除而丢失。
>    - 匿名挂载（系统分配）和具名挂载（用户命名）
>    - 一般来说都在这个目录下(linux)：/var/lib/docker/volume/xxx
>
>2. **主机卷（Host Volumes）**：
    >    - 将宿主机目录挂载到容器中，数据直接存储在宿主机文件系统上。
>    - 容器和宿主机共享数据，适用于需要直接访问宿主机文件的情况。
    >
    >   >[!important]
    >    > 命名卷由Docker管理，适合持久化数据；主机卷则直接与宿主机文件系统关联，适用于共享文件。`命名卷`写名称；`主机卷`写宿主机路径。

### Dockerfile
Dockerfile 是一个文本文件，包含了一系列的指令，用于定义如何构建一个 Docker 镜像。
它的作用是自动化地描述镜像构建的过程，包括指定基础镜像、安装软件、配置环境、复制文件、定义工作目录、暴露端口、指定容器启动命令等。
通过 Dockerfile，开发者可以方便地构建和部署容器化应用，确保环境一致性和自动化构建。