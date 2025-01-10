---
title: ❄️域名购买与配置
tags:
  - DNS
  - Wildcard
  - Namecheap
aside: false
createTime: 2025/1/10 01:33:57
permalink: /article/p9ts1au1/
---

==GitHub Pages 自定义域名配置指南==

对于 GitHub 的 Pages 页的自定义域名配置，可以参考以下的文章：
<CardGrid>
<LinkCard title="🌈 GitHub Pages 自定义域名配置指南" href="https://blog.csdn.net/qq_34902437/article/details/140298754"></LinkCard>
</CardGrid>


==如何在 Namecheap 上购买国外域名?==

你可以按照以下链接中的指南，了解如何在 Namecheap 上购买域名：

<CardGrid>
  <LinkCard title="🌈 如何在 Namecheap 上购买国外域名?" href="https://blog.csdn.net/qq_21955513/article/details/136906944"></LinkCard>
</CardGrid>

---


==在国内购买 Namecheap 域名的支付方式==

由于国内无法直接使用支付软件进行支付，你需要使用 **Wildcard** 网站申请虚拟信用卡。详细注册流程可以参考以下链接：

<CardGrid>
  <LinkCard title="🌈 虚拟信用卡 WildCard 官方详细注册流程" href="https://www.laodengai.com/register-wildcard"></LinkCard>
</CardGrid>

==GitHub Pages启用 Cloudflare加速及HTTPS==

<CardGrid>
  <LinkCard title="🌈 GitHub Pages启用 Cloudflare加速及HTTPS" href="https://siriusq.top/github-pages-%E5%90%AF%E7%94%A8-cloudflare-%E5%8A%A0%E9%80%9F%E5%8F%8A-https.html"></LinkCard>
</CardGrid>

---

## ⚙️ Namecheap Advanced DNS 配置
以下是 Namecheap 的 Advanced DNS 配置，适用于将域名与 GitHub Pages 关联：

| **Type**  | **Host** | **Value**             |
|-----------|----------|-----------------------|
| A         | @        | 185.199.109.153       |
| A         | @        | 185.199.110.153       |
| A         | @        | 185.199.111.153       |
| CNAME     | www      | your-username.github.io |

> 请确保将 `your-username` 替换为你的 GitHub 用户名。

>[!tip]
> A 记录 将根域名 paiad.online 指向 GitHub Pages 的 IP 地址。
> 
>CNAME 记录 将 www.paiad.online 指向你的 GitHub Pages 页面。

## 关于域名的介绍

### 1. **域名层级结构**
- **一级域名（顶级域名 TLD）**：是域名的最后部分，例如 `.com`、`.org`、`.net`，还有国家代码顶级域名（如 `.cn`、`.us`、`.jp` 等）。例如在 `example.com` 中，`com` 就是顶级域名。

- **二级域名（Second-level Domain）**：是紧跟在顶级域名前面的部分。一般情况下，二级域名是指企业、网站或个人的域名名称。例如，`example.com` 中的 `example` 就是二级域名。也可以理解为一个品牌或者一个主域名。

- **三级域名（Third-level Domain）**：是紧跟在二级域名之前的部分。通常，三级域名用于表示网站的不同子部分或子服务，例如 `blog.example.com`、`mail.example.com`，其中 `blog` 和 `mail` 就是三级域名。

### 2. **层级示例**
以 `blog.example.com` 为例：
- `com` 是**顶级域名**（TLD）。
- `example` 是**二级域名**（Second-level Domain）。
- `blog` 是**三级域名**（Third-level Domain）。

### 3. **功能和使用**
- **二级域名**：通常是主域名，代表网站的品牌或主题，是网站的主要入口。例如，你的公司域名 `company.com` 就是一个二级域名，代表你的公司。你可以通过购买二级域名来构建你的品牌和网站。

- **三级域名**：用于为不同的子服务、子网站或不同部门创建子域。通常，三级域名用来区分不同的功能部分。例如：
    - `blog.example.com`：指向一个专门的博客页面。
    - `shop.example.com`：指向商店页面。
    - `mail.example.com`：指向邮件服务。

### 4. **DNS 配置**
- **二级域名**：你购买的域名通常是二级域名，例如 `example.com`。你可以为它配置各种服务，比如邮件服务、网页托管等。
- **三级域名**：在二级域名下你可以创建任意数量的三级域名。例如，你可以在 `example.com` 下创建 `blog.example.com`，并将其指向特定的 IP 地址或服务。

### 5. **区别总结**
| 级别 | 例子                  | 描述                                      |
|------|-----------------------|-------------------------------------------|
| 一级域名 | `.com`、`.org`、`.cn` | 顶级域名，表示域名的类型或国家/地区 |
| 二级域名 | `example.com`         | 主域名，通常用于表示网站或公司名称    |
| 三级域名 | `blog.example.com`    | 子域名，表示该域名下的特定服务或部分 |

### 总结：
- **二级域名**：是你购买的域名，通常是代表某个网站、公司或品牌。
- **三级域名**：是你在二级域名下创建的子域，用来指向网站的不同部分或服务。