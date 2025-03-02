---
title: 🌽凸优化理论
createTime: 2025/03/01 22:27:48
permalink: /article/1xbonzg8/
tags:
    - Math
    - Machine Learning
---

### 目标函数
$$\min f(x), x \in \mathbb{R}^n$$

s.t.

$$g_i(x) \leq 0,  i = 1, 2, 3, ..., m$$

$$h_i(x) = 0,  i = 1, 2, 3, ..., q$$

为了求解上述问题，我们引入拉格朗日函数：
$$ L(x, \lambda, v) = f(x) + \sum \lambda_i g_i(x) + \sum v_i h_i(x) $$

原问题等价于 <===> 求解目标：
$$ \min_x \max_{\lambda, v} L(x, \lambda, v) $$

s.t.

$$ \lambda \geq 0 $$

>[!important]
> 为什么需要增加约束$\lambda \geq 0$?
> 
>当拉格朗日函数未满足为零的强制约束时所对应的增广拉格朗日函数的实际约束必须满足：
> 
> 当违反约束条件时，即x不在`可行域`内: $L(x, \alpha, \beta) \rightarrow +\infty$ ，
> 
>当满足约束条件时，即x在`可行域`内: $L(x, \alpha, \beta) = f(x)$

现在原问题即可转为：

$$ \min_x \max_{\lambda, v} L(x, \lambda, v)  \quad\quad s.t.\quad \lambda \geq 0 $$

### 对偶问题

对偶函数定义为：
$$
q(\lambda, v) = \min_x \left[ f(x) + \sum_{i=1}^m \lambda_i g_i(x) + \sum_{j=1}^p v_j h_j(x) \right]
$$

即：
$$
q(\lambda, v) = \min_x L(x, \lambda, v)
$$

对偶问题是：
$$
\max_{\lambda, v} q(\lambda, v) \quad \text{s.t.} \quad \lambda \geq 0
$$
展开后为：

$$
\max_{\lambda, v} \left( \min_x L(x, \lambda, v) \right) \quad \text{s.t.} \quad \lambda \geq 0
$$

### 什么是凸集？
在数学中，一个集合 $C$ 被称为==凸集==，如果对于集合中的任意两个点 $x$ 和 $y$，连接这两点的直线段完全包含在 $C$ 中。

用数学语言表达：

若对于任意 $x, y \in C$ 和任意 $\lambda \in [0, 1]$，都有：
$$
\lambda x + (1 - \lambda) y \in C
$$
这称为凸组合，意思是沿着直线走不会离开集合。

==可视化举例：=={.caution}
<CardGrid>
<ImageCard
image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/convex-set-e2.png"
title="非凸集"
/>
<ImageCard
image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/convex-set-e1.png"
title="凸集"
/>
</CardGrid>

>“拉格朗日对偶问题”如何直观理解？“KKT条件” “Slater条件” “凸优化”打包理解
@[bilibili](BV1HP4y1Y79e)