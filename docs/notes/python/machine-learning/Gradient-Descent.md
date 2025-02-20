---
title: 梯度下降
createTime: 2025/02/01 12:38:04
permalink: /python/2moeut57/
#aside: false
---

为了方便理解，这里以线性回归的损失函数为例：
$$J(w,b)=\frac{1}{m}\sum_{i=1}^m(y_i-(w^Tx_i+b))^2$$
::: steps
1. Step1 对权重向量$w$的梯度

   对$w$的第$j$个分量$w_j$求偏导：
   $$\frac{\partial J(w,b)}{\partial w_j}=\frac2m\sum_{i=1}^m(y_i-(w^Tx_i+b))\cdot(-x_{ij})$$
   将所有分量组累加为梯度向量：
   $$\nabla_wJ(w,b)=\frac2m\sum_{i=1}^m(y_i-(w^Tx_i+b))\cdot(-x_i)$$
   简化后：

   $$\nabla_wJ(w,b)=-\frac2m\sum_{i=1}^m(y_i-\hat{y}_i)x_i$$
   其中$\hat{y}_i=w^Tx_i+b$是预测值。
2. Step2 对偏置项$b$的梯度

   对b求偏导:
   $$\frac{\partial J(w,b)}{\partial b}=\frac{2}{m}\sum_{i=1}^m(y_i-(w^Tx_i+b))\cdot(-1) $$
   简化后:
   $$\nabla_bJ(w,b)=-\frac{2}{m}\sum_{i=1}^m(y_i-\hat{y}_i)$$
3. Step3 损失函数$J(w,b)$的梯度

   $$\nabla_wJ(w,b)=-\frac2m\sum_{i=1}^m(y_i-\hat{y}_i)x_i\\ \nabla_bJ(w,b)=-\frac2m\sum_{i=1}^m(y_i-\hat{y_i})$$

4. Step4 梯度下降更新规则
   <ImageCard
   image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/gradient-descent.png"
   width = 65%
   center = true
   />

   $$w\leftarrow w-\alpha\nabla_wJ(w,b)\\b\leftarrow b-\alpha\nabla_bJ(w,b)$$
   其中$\alpha$ 是学习率。
:::