---
title: 👻自定义Github主页
createTime: 2025/02/21 15:40:25
permalink: /article/q08d949i/
tags:
  - Github
  - Homepage
excerpt:
  <img src="https://raw.githubusercontent.com/paiad/paiad/output/github-contribution-grid-snake.svg" alt="GitHub Contribution Grid Snake" />

---
### 步骤导向
:::steps
1. 以自己的Github用户名创建一个仓库

<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/github-e1.jpg"
/>

2. 在此仓库的main分支添加README.md文件

<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/github-e2.png"
/>

3. 接着在README编写即可
可参考如下模板
```md
# 👋 Hi, I'm [你的名字]

## 🌟 关于我
- 🔭 我目前正在从事 **[项目名称或工作内容]**。
- 🌱 我正在学习 **[技能/技术]**。
- 💬 你可以向我咨询 **[领域/主题]**。
- 📫 如何联系我：[Email](mailto:your-email@example.com) | [LinkedIn](https://www.linkedin.com/in/your-profile) | [Twitter](https://twitter.com/your-handle)
- 😄 代词：He/Him | She/Her | They/Them
- ⚡ 趣味事实：我喜欢 **[兴趣爱好]**！

---

## 🚀 我的 GitHub 统计

<!-- 动态生成的 GitHub 统计卡片 -->
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=你的用户名&show_icons=true&title_color=ffffff&icon_color=0074D9&text_color=f0f0f0&bg_color=151515)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=你的用户名&layout=compact&title_color=ffffff&icon_color=0074D9&text_color=f0f0f0&bg_color=151515)

---

## 📈 我的 GitHub 活动图

<!-- GitHub 贡献网格 -->
![](https://github.com/你的用户名/你的用户名/blob/output/github-contribution-grid-snake-dark.svg)

---

## 🛠️ 技能

### 编程语言
- Python, JavaScript, Java, C++

### 框架与库
- React, Node.js, Flask, TensorFlow

### 工具与平台
- Git, Docker, Kubernetes, AWS

---

## 📌 推荐项目

### 1. **[项目名称](https://github.com/你的用户名/项目链接)**
一个简短的描述，说明该项目解决了什么问题以及它的亮点。

### 2. **[另一个项目](https://github.com/你的用户名/项目链接)**
另一个有趣的项目，附带简要说明。

---

## 🤝 联系方式

- [GitHub Profile](https://github.com/你的用户名)
- [LinkedIn](https://www.linkedin.com/in/your-profile)
- [Twitter](https://twitter.com/your-handle)
- [个人网站](https://your-website.com)

---

## 🎉 感谢访问！
如果你对我的项目感兴趣，或者想合作，请随时联系我！😊
```
4. 添加贪吃蛇效果(可选)
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/github-e4.png"
/>
填充snake.yml代码
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/github-e3.png"
/>

依次点击 settings-> actions-> general，调整 Workflow permissions 权限改为 `Read and write permissions`
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/github-e5.png"
/>

在ACTIONS中执行这个工作流(Run workflow)
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/github-e6.png"
/>
最后在原本的README.md文件添加如下代码即可(username需要替换为自己的)：

```shell
![](https://github.com/username/username/blob/output/github-contribution-grid-snake-dark.svg)
```

最后效果如下所示：

![](https://cdn.jsdelivr.net/gh/Pai3141/Pai3141@output/github-contribution-grid-snake-dark.svg)
:::

### snake.yml
![](https://cdn.jsdelivr.net/gh/Pai3141/Pai3141@output/github-contribution-grid-snake.svg)
::: code-tabs
@tab snake.yml
```shell
name: generate animation

on:
  # 每 24 小时自动运行一次
  schedule:
    - cron: "0 */24 * * *" 
  
  # 允许手动触发工作流
  workflow_dispatch:
  
  # 在 master 分支上的每次推送时运行
  push:
    branches:
    - master
    
jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 10  # 设置超时时间为 10 分钟
    
    steps:
      # 根据 GitHub 用户（<github_user_name>）的贡献图生成一个贪吃蛇游戏，输出 SVG 动画到 <svg_out_path>
      - name: 生成 github-contribution-grid-snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}  # 使用仓库所有者的用户名
          outputs: |
            dist/github-contribution-grid-snake.svg  # 输出普通主题的 SVG 文件
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark  # 输出深色主题的 SVG 文件
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # 使用 GitHub 提供的默认令牌
      
      # 将 <build_dir> 中的内容推送到指定分支
      # 内容可以通过以下链接访问：
      # https://raw.githubusercontent.com/<github_user>/<repository>/<target_branch>/<file>
      # 或者作为 GitHub Pages 访问
      - name: 将 github-contribution-grid-snake.svg 推送到 output 分支
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output  # 目标分支为 output
          build_dir: dist  # 要推送的目录为 dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # 使用 GitHub 提供的默认令牌
```
:::

### profile-3d.yml
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/img/github-3d-e1.png"
/>

<CardGrid>
<RepoCard repo="yoshi389111/github-profile-3d-contrib" />
</CardGrid>

```shell
name: GitHub-Profile-3D-Contrib

on:
  schedule: # 03:00 JST == 18:00 UTC
    - cron: "0 18 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    name: generate-github-profile-3d-contrib
    steps:
      - uses: actions/checkout@v3
      - uses: yoshi389111/github-profile-3d-contrib@0.7.1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          USERNAME: ${{ github.repository_owner }}
      - name: Commit & Push
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add -A .
          git commit -m "generated"
          git push
```