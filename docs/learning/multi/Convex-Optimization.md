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

### 凸集与非凸集
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

### 凸函数与凹函数
<ImageCard
image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/convex-concave-v1.png"
title="凸函数与凹函数"
/>



==凸函数 (Convex Function)==

- **定义**：一个函数 $f(x)$ 是凸函数，如果对于定义域内任意两点 $x_1$ 和 $x_2$，以及任意 $t \in [0, 1]$，满足：
  $$
  f(t x_1 + (1-t) x_2) \leq t f(x_1) + (1-t) f(x_2)
  $$

==凹函数 (Concave Function)==

- **定义**：一个函数 $f(x)$ 是凹函数，如果对于定义域内任意两点 $x_1$ 和 $x_2$，以及任意 $t \in [0, 1]$，满足：
  $$
  f(t x_1 + (1-t) x_2) \geq t f(x_1) + (1-t) f(x_2)
  $$

>[!note]
>区别和联系
>
>- **图像形状**：
>    - 凸函数：碗口朝上（U 形）。
>    - 凹函数：碗口朝下（倒 U 形）。
>- **二阶导数**：
>    - 凸：$f''(x) \geq 0$（曲率非负）。
>    - 凹：$f''(x) \leq 0$（曲率非正）。
>- **关系**：如果 $f(x)$ 是凸函数，那么 $-f(x)$ 是凹函数，反之亦然。

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

>[!note]
>我们可以清楚看到$\max  q(\lambda, v)$是关于$\lambda$, $v$的线性函数，则它既是凸函数也是凹函数


展开后为：

$$
\max_{\lambda, v} \left( \min_x L(x, \lambda, v) \right) \quad \text{s.t.} \quad \lambda \geq 0
$$

原问题：
$$ \min_x \max_{\lambda, v} L(x, \lambda, v) \quad \text{s.t.} \quad \lambda \geq 0$$


对偶问题和原问题之间的关系
>[!important]
>$$
>\max_{\lambda, \nu} L(x, \lambda, \nu) \geq L(x, \lambda, \nu) \geq \min_{x} L(x, \lambda, \nu)
>$$
>
>$$
>A(x) = \max_{\lambda, \nu} L(x, \lambda, \nu) \geq L(x, \lambda, \nu) \geq \min_{x} L(x, \lambda, \nu) = I(\lambda, \nu)
>$$
>
>$$
>A(x) \geq I(\lambda, \nu)
>$$
>
>$$
>A(x) \geq \min_{x} A(x) \geq \max_{\lambda, \nu} I(\lambda, \nu) \geq I(\lambda, \nu)
>$$
>
>$$
>P^* = \min_{x} A(x) \geq \max_{\lambda, \nu} I(\lambda, \nu) = D^*
>$$
> 

==即原问题的解集是对偶问题的解的超集=={.important}





>“拉格朗日对偶问题”如何直观理解？“KKT条件” “Slater条件” “凸优化”打包理解
@[bilibili](BV1HP4y1Y79e)