---
title: 线性回归
createTime: 2025/01/31 23:37:06
permalink: /python/cdvav9jp/
---
::: steps 
1. Step1：回归问题概述

    预测一个连续的数值型输出变量(目标变量)与自变量之间的关系。

2. Step2：回归方程
   - $\theta$是列向量
   - 真实值：$y_i$
   - 预测值：$X\theta$
   $$y_i=\theta_0+\theta_1x_1+\theta_2x_2+\cdots+\theta_nx_n+\epsilon_i=X\theta+\epsilon_i$$

3. Step3：误差项
   $$
    \epsilon_i服从均值为零的正态分布，即\epsilon_i \sim N(0,\sigma^{2})
   $$
   $$
   P(\varepsilon_{i})=\frac{1}{\sqrt{2\pi}\sigma}exp(-\frac{\varepsilon_{i}^{2}}{2\sigma^{2}})
   $$
   - 均值为零：$表示误差项的平均影响为零，即正误差和负误差在长期中会相互抵消。$
   - 方差为$\sigma^2$: $给定一组数据值与均值之间差异的平方的平均值为\sigma^2(数据的集中程度)$

4. Step4：极大似然估计求解$\theta$
    $$P(y_i | x_i; \theta)=\frac{1}{\sqrt{2\pi}\sigma}exp(-\frac{(y_i-X\theta)^2}{2\sigma^{2}})$$

   >解释：将$P(\varepsilon_{i})$转化为关于$\theta$的函数，目的是为了求解出$\theta$。
   > 
   >在给定输入$x_i、\theta$的条件下，输出$y_i$的条件概率
   - 极大似然估计
   $$\begin{array} {rcl}L(\theta) & = & \prod\limits_{i=1}^mp(y_{i}\mid x_{i};\theta) & = & \prod\limits_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(y_{i}-X\theta)^2}{2\sigma^2}\right) \end{array}$$
   $$\ln L(\theta)=\ln\prod_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(y_{i}-X\theta)^2}{2\sigma^2}\right)=m\ln\frac{1}{\sqrt{2\pi}\sigma}-\frac{1}{2\sigma^2}\sum_{i=1}^{m}(y_{i}-X\theta)^2$$
   >为了使每一个$y_i$的值出现的概率尽可能大(所有$y_i$的乘积最大)，所以要有$\sum\limits_{i=1}^{m}(X\theta-y_{i})^2$尽可能小。

5. Step5：最后得到$\theta$的值

   对函数$\sum\limits_{i=1}^{m}(X\theta-y_{i})^2$求$\theta$的偏导，这里运用线性代数的知识：
    >1. $\alpha为矩阵，则有\alpha^{2}=\alpha^{T}\alpha$
    >2. $\frac{\partial \theta^TX^TX\theta}{\theta}=X^TX\theta$

   $最后令\text{偏导为}0，化简得:\theta=\left(X^TX\right)^{-1}X^Ty$
   >[!tip]
   > $\sum\limits_{i=1}^{m}(X\theta-y_{i})^2$事实上为每一个X对应的拟合后平面的值与其真实值之间的差值的平方之和，
   >
   >我们需要做的就是怎么调整$\theta$，使这个平方之和最小。

:::