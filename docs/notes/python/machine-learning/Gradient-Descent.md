---
title: 梯度下降
createTime: 2025/02/01 12:38:04
permalink: /python/2moeut57/
aside: false
---
### 梯度下降
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

   $$w\leftarrow w-\alpha\nabla_wJ(w,b)\\b\leftarrow b-\alpha\nabla_bJ(w,b)$$
   其中$\alpha$ 是学习率。
:::


### 梯度下降的三种方式

梯度下降（Gradient Descent）是一种常用的优化算法，用于最小化损失函数。根据每次更新参数时使用的数据量不同，梯度下降可以分为以下三种方式：

---

#### 1. 批量梯度下降（Batch Gradient Descent, BGD）

- **核心思想**：每次更新参数时，使用**全部训练数据**计算损失函数的梯度。
- **更新公式**：
  $$
  \theta \leftarrow \theta - \alpha \nabla_\theta J(\theta)
  $$
  其中：
   - $\theta$ 是模型参数
   - $\alpha$ 是学习率
   - $\nabla_\theta J(\theta)$ 是损失函数 $J(\theta)$ 对 $\theta$ 的梯度

- **优点**：
   - 梯度计算准确，更新方向稳定。
   - 一定能收敛到全局最优（对于凸函数）或局部最优（对于非凸函数）。

- **缺点**：
   - 每次更新需要计算全部数据的梯度，计算量大，速度慢。
   - 不适合大规模数据集。

---

#### 2. 随机梯度下降（Stochastic Gradient Descent, SGD）

- **核心思想**：每次更新参数时，**随机选择一个样本**计算梯度。
- **更新公式**：
  $$
  \theta \leftarrow \theta - \alpha \nabla_\theta J_i(\theta)
  $$
  其中 $J_i(\theta)$ 是第 $i$ 个样本的损失。

- **优点**：
   - 每次更新只用一个样本，计算速度快。
   - 适合大规模数据集。
   - 具有一定的随机性，可能跳出局部最优。

- **缺点**：
   - 梯度更新方向波动较大，收敛不稳定。
   - 可能无法收敛到最优解，而是在最优解附近震荡。

---

#### 3. 小批量梯度下降（Mini-Batch Gradient Descent, MBGD）

- **核心思想**：每次更新参数时，使用**一小部分数据（mini-batch）**计算梯度。
- **更新公式**：
  $$
  \theta \leftarrow \theta - \alpha \nabla_\theta J_B(\theta)
  $$
  其中 $J_B(\theta)$ 是小批量数据 $B$ 的损失。

- **优点**：
   - 结合了 BGD 和 SGD 的优点，既减少了更新方差，又提高了计算效率。
   - 适合大规模数据集。
   - 是深度学习中最常用的优化方法。

- **缺点**：
   - 需要选择合适的批量大小（batch size），过小会导致更新不稳定，过大会增加计算量。

---

## 4. 对比总结

| 方法                | 数据量       | 更新频率 | 收敛稳定性 | 计算效率 | 适用场景           |
|---------------------|--------------|----------|------------|----------|--------------------|
| 批量梯度下降 (BGD)   | 全部数据     | 低       | 高         | 低       | 小规模数据集       |
| 随机梯度下降 (SGD)   | 单个样本     | 高       | 低         | 高       | 大规模数据集       |
| 小批量梯度下降 (MBGD) | 小批量数据   | 中       | 中         | 中       | 大规模数据集（常用）|

---

## 5. 实际应用

- **深度学习**：通常使用小批量梯度下降（MBGD），批量大小（batch size）一般为 32、64、128 等。
- **传统机器学习**：对于小规模数据集，可以使用批量梯度下降（BGD）；对于大规模数据集，可以使用随机梯度下降（SGD）或小批量梯度下降（MBGD）。