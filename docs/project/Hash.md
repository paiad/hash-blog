---
title: 🚀Hash后端
tags:
  - SpringBoot
createTime: 2024/11/04 12:36:04
permalink: /article/htnsvz2j/
---
# Let's Learn Hash 🎃
><https://gitee.com/redemptionad/hash>
## 项目背景
本项目旨在构建一个通用的后端框架，涵盖了MyBatisPlus、WebSocket、RabbitMQ等多种技术栈，并融入了代码生成器。
我们的目标是通过一系列强大的工具和技术，使开发者能够专注于业务逻辑的实现，而不是在基础设施的构建和维护上浪费时间。
我们致力于提供一个高效、可扩展的后端框架，帮助开发者快速构建稳定、可靠的后端服务。

## 环境要求

- ☕️ **Java 17** 或更高版本
- 🌱 **Spring Boot 3.0.0** 或更高版本
- 🐬 **MySQL 8.0** 或更高版本
- 🚀 **Redis 6.0** 或更高版本
- 📦 **Maven 3.9.6** 或以上
- 📖 **Git** (Gitee、GitHub)

## 五大模块

### 依赖的传递关系
```css
[hash-common] → [hash-system] → [hash-framework] → [hash-server]
[hash-common] → [hash-generator]
```

### 1. 通用工具模块 (hash-common) 🛠️
```plaintext
├── hash-common
    └── annotation   # 注解
    └── constant     # 常量
    └── enums        # 枚举类
    └── exception    # 异常类
    └── result       # 封装的返回结果
    └── utils        # 工具类
```


### 2. 系统模块 (hash-system) 🏗️
```plaintext
├── hash-system
    └── holder       # 线程变量
    └── mapper       # 持久层
    └── pojo         # 实体类
         └── dto     # 数据传输对象
         └── po      # 实体类
         └── vo      # 视图对象
    └── service      # 业务层
    └── validate     # 校验接口
```


### 3. 核心模块 (hash-framework) ⚙️
```plaintext
├── hash-framework
    └── aspect          # 切面类
    └── config          # 配置类
         └── listener   # 监听器
    └── handler         # 处理器
    └── interceptor     # 拦截器
```


### 4. 服务入口模块 (hash-server) 🚪
```plaintext
├── hash-server
    └── controller       # 控制层
    └── core.config      # 核心配置类
    └── 🚀HashApplication  # 启动类
```

### 5. 代码生成模块 (hash-generator) 🔧

```plaintext
├── hash-generator
    └── template       # 模板文件夹
    └── utils          # 工具类
    └── CodeGenerator  # 启动类
```

## **代码生成器**
> 1. 使用 Java 的模板引擎 Velocity 实现了 Controller 层的初步构建。
> 2. 对于 Service、Mapper 和 Pojo 层的生成，使用 MybatisX 插件自动生成代码。

