---
title: 逻辑回归
createTime: 2025/02/23 23:20:52
permalink: /python/9laenv5d/
---
### 步骤分析
::: steps
1. Step1：分类问题概述

   逻辑回归用于解决分类问题，预测一个样本属于某个类别的概率（通常是二分类问题）。目标是建立输入变量（自变量）与输出类别概率之间的关系，输出值在 [0, 1] 区间内。

2. Step2：逻辑回归模型
    - 权重向量：$w$
    - 偏置项：$b$
    - 输入特征向量：$x_i$
    - 线性组合：$z = w^Tx_i + b$
    - Sigmoid 函数：将线性输出映射到概率
      $$
      \hat{y}_i = \sigma(z) = \frac{1}{1 + e^{-z}} = \frac{1}{1 + e^{-(w^Tx_i + b)}}
      $$
      其中，$\hat{y}_i$ 表示样本 $x_i$ 属于正类（例如类别 1）的预测概率。
    - 矩阵形式：
      $$
      X = \begin{pmatrix}
      x_1^T & 1 \\
      x_2^T & 1 \\
      \vdots & \vdots \\
      x_n^T & 1
      \end{pmatrix},
      \hat{w} = \begin{pmatrix}
      w \\
      b
      \end{pmatrix}
      $$
      则 $z = X\hat{w}$，$\hat{y} = \sigma(X\hat{w})$。

3. Step3：概率假设与误差

   逻辑回归假设输出 $y_i$ 服从伯努利分布（Bernoulli Distribution），即：
    - 若 $y_i = 1$，则 $P(y_i = 1 | x_i; \hat{w}) = \hat{y}_i$
    - 若 $y_i = 0$，则 $P(y_i = 0 | x_i; \hat{w}) = 1 - \hat{y}_i$
    - 概率分布统一表示为：
      $$
      P(y_i | x_i; \hat{w}) = \hat{y}_i^{y_i} (1 - \hat{y}_i)^{1 - y_i}
      $$
   > 解释：这里的 $\hat{y}_i = \sigma(w^Tx_i + b)$ 是模型预测的概率，$y_i$ 是实际标签（0 或 1）。

4. Step4：极大似然估计求解 $\hat{w}$

   目标是通过极大似然估计（MLE）找到使观测数据概率最大的参数 $\hat{w}$。
    - 似然函数：
      $$
      L(\hat{w}) = \prod_{i=1}^m P(y_i | x_i; \hat{w}) = \prod_{i=1}^m \hat{y}_i^{y_i} (1 - \hat{y}_i)^{1 - y_i}
      $$
    - 对数似然函数（便于计算）：
      $$
      \ln L(\hat{w}) = \sum_{i=1}^m \left[ y_i \ln \hat{y}_i + (1 - y_i) \ln (1 - \hat{y}_i) \right]
      $$
    - 损失函数（负对数似然）：
      $$
      J(\hat{w}) = -\frac{1}{m} \ln L(\hat{w}) = -\frac{1}{m} \sum_{i=1}^m \left[ y_i \ln \hat{y}_i + (1 - y_i) \ln (1 - \hat{y}_i) \right]
      $$
      这就是逻辑回归的交叉熵损失函数（Cross-Entropy Loss）。
   > 解释：最大化 $\ln L(\hat{w})$ 等价于最小化 $J(\hat{w})$。交叉熵损失衡量预测概率分布与真实标签分布之间的差异。

5. Step5：优化 $\hat{w}$ 的值

   由于逻辑回归的损失函数 $J(\hat{w})$ 是非线性的，无法像线性回归那样直接求解解析解，因此通常使用梯度下降法优化：
    - 损失函数对 $\hat{w}$ 的偏导：
      $$
      \frac{\partial J(\hat{w})}{\partial \hat{w}} = \frac{1}{m} \sum_{i=1}^m (\hat{y}_i - y_i) x_i
      $$
      > 推导过程：
      > - $\hat{y}_i = \sigma(X\hat{w})$
      > - Sigmoid 函数的导数：$\frac{\partial \hat{y}_i}{\partial z} = \hat{y}_i (1 - \hat{y}_i)$
      > - 通过链式法则计算偏导，得到上述结果。
    - 梯度下降更新规则：
      $$
      \hat{w} := \hat{w} - \alpha \frac{\partial J(\hat{w})}{\partial \hat{w}}
      $$
      其中，$\alpha$ 是学习率。
   > [!tip]
   > 逻辑回归的目标是最小化交叉熵损失，使预测概率 $\hat{y}_i$ 尽可能接近真实标签 $y_i$。
   >
   > 与线性回归的最小二乘法不同，逻辑回归通过迭代优化来逼近最优解。常用的优化算法包括梯度下降、随机梯度下降（SGD）或更高级的优化器（如 Adam）。
   >
   > Tips：[逻辑回归实现](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html) 可参考 scikit-learn 提供的实现。
   :::