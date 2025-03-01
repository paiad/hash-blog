---
title: 🌽凸优化理论
createTime: 2025/03/01 22:27:48
permalink: /article/1xbonzg8/
---

### 目标函数
$$\min f_0(x), x \in \mathbb{R}^n$$

s.t.

$$f_i(x) \leq 0, 其中 i = 1, 2, 3, ..., m$$

$$h_i(x) = 0, 其中 i = 1, 2, 3, ..., q$$

为了求解上述问题，我们引入拉格朗日函数：
$$ L(x, \lambda, v) = f_0(x) + \sum \lambda_i f_i(x) + \sum v_i h_i(x) $$

原问题等价于 <===> 求解目标：
$$ \min_x \max_{\lambda, v} L(x, \lambda, v) $$

s.t.

$$ \lambda \geq 0 $$

>[!important]
> 为什么需要增加约束$\lambda \geq 0$?
> 
>当拉格朗日函数未满足为零的强制约束时所对应的增广拉格朗日函数的实际约束必须满足。
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