---
title: 线性回归
createTime: 2025/01/31 23:37:06
permalink: /python/cdvav9jp/
aside: false
---
::: steps 
1. Step1：回归问题概述

    预测一个连续的数值型输出变量(目标变量)与自变量之间的关系。

2. Step2：线性回归方程
   - 权重向量：$w$
   - 偏置项：$b$
   - 实际值：$y_i$
   - 预测值：$w^Tx_i+b$
   $$y_i=w_1x_1+w_2x_2+\cdots+w_nx_n+b+\epsilon_i=w^Tx_i+b+\epsilon_i=X\hat w$$
   $$X=
     \begin{pmatrix}
     x_1^T & 1 \\
     x_2^T & 1 \\
     \vdots & \vdots \\
     x_n^T & 1
   \end{pmatrix},
   \hat w = \begin{pmatrix}
     w \\
     b
     \end{pmatrix}$$

3. Step3：误差项
   $$
    \epsilon_i服从均值为零的正态分布，即\epsilon_i \sim N(0,\sigma^{2})
   $$
   $$
   P(\varepsilon_{i})=\frac{1}{\sqrt{2\pi}\sigma}exp(-\frac{\varepsilon_{i}^{2}}{2\sigma^{2}})
   $$
   - 均值为零：$表示误差项的平均影响为零，即正误差和负误差在长期中会相互抵消。$
   - 方差为$\sigma^2$: $给定一组数据值与均值之间差异的平方的平均值为\sigma^2(数据的集中程度)$

4. Step4：极大似然估计求解$\hat w$
    $$P(y_i | x_i; \hat w)=\frac{1}{\sqrt{2\pi}\sigma}exp(-\frac{(y_i-X\hat w)^2}{2\sigma^{2}})$$

   >解释：将$P(\varepsilon_{i})$转化为关于$\hat w$的函数，目的是为了求解出$\hat w$。
   > 
   >在给定输入$x_i、\hat w$的条件下，输出$y_i$的条件概率
   - 极大似然估计
   $$\begin{array} {rcl}L(\hat w) & = & \prod\limits_{i=1}^mp(y_{i}\mid x_{i};\hat w) & = & \prod\limits_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(y_{i}-X\hat w)^2}{2\sigma^2}\right) \end{array}$$
   $$\ln L(\hat w)=\ln\prod_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(y_{i}-X\hat w)^2}{2\sigma^2}\right)=m\ln\frac{1}{\sqrt{2\pi}\sigma}-\frac{1}{2\sigma^2}\sum_{i=1}^{m}(y_{i}-X\hat w)^2$$
   >为了使每一个$y_i$的值出现的概率尽可能大(所有$y_i$的乘积最大)，所以要有$\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$尽可能小。

5. Step5：最后得到$\hat w$的值

   对函数$\frac{1}{m}\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$求$\hat w$的偏导以求其最小值，这里运用线性代数的知识：
    >1. $\alpha为矩阵，则有\alpha^{2}=\alpha^{T}\alpha$
    >2. $\frac{\partial \hat w^TX^TX\hat w}{\partial \hat w}=X^TX\hat w$

   $最后令\text{偏导为}0，化简得:\hat w^*=\left(X^TX\right)^{-1}X^Ty$
   >[!tip]
   > $\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$事实上为每一个X对应的拟合后平面的值与其真实值之间的差值的平方之和，
   >
   >我们需要做的就是怎么调整$\hat w$，使这个平方之和最小。
   >
   >tips：最小二乘法是一种通过最小化数据点和回归模型之间误差的平方和来求解回归模型参数的方法，即使MSE最小化。(MSE: 均方误差)

:::

