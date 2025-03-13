---
title: K近邻算法
createTime: 2025/03/08 17:30:15
permalink: /python/3zldhyk4/
---
### 步骤分析
::: steps
1. Step1：分类问题概述

   K-近邻（K-Nearest Neighbors, KNN）算法是一种简单而有效的监督学习方法，用于分类和回归任务。它基于“近朱者赤”的思想，通过样本在特征空间中的距离来判断其类别或预测值。KNN 是一种懒惰学习算法（lazy learning），即在训练阶段不构建模型，而在预测时直接根据训练数据进行计算。

2. Step2：KNN 模型
    - 数据集：训练集 $X = \{(x_1, y_1), (x_2, y_2), \dots, (x_n, y_n)\}$，其中 $x_i \in \mathbb{R}^d$ 是 $d$ 维特征向量，$y_i$ 是对应的标签（分类任务中为离散值，回归任务中为连续值）。
    - 参数 $K$：近邻数量，需预先指定，表示参考最近的 $K$ 个邻居。
    - 距离度量：通常使用欧几里得距离计算样本间的距离：
      $$
      d(x_i, x_j) = \sqrt{\sum_{m=1}^d (x_{i,m} - x_{j,m})^2}
      $$
      其他可选距离包括曼哈顿距离、闵可夫斯基距离等。
    - 目标（分类）：对于新样本 $x$，根据 $K$ 个最近邻的标签，通过多数投票（majority voting）确定其类别：
      $$
      y = \arg\max_c \sum_{i \in N_K(x)} I(y_i = c)
      $$
      其中，$N_K(x)$ 是 $x$ 的 $K$ 个最近邻，$I(\cdot)$ 是指示函数。
    - 目标（回归）：取 $K$ 个最近邻的平均值：
      $$
      y = \frac{1}{K} \sum_{i \in N_K(x)} y_i
      $$
   > 解释：KNN 的核心在于“距离决定相似性”，假设特征空间中距离近的样本具有相似的性质。

3. Step3：算法流程

   KNN 的计算过程简单直接，主要包括以下步骤：
    - **步骤 1：计算距离**
      对于新样本 $x$，计算其与训练集中所有样本 $x_i$ 的距离 $d(x, x_i)$。
    - **步骤 2：选择最近邻**
      根据距离从小到大排序，选择前 $K$ 个最近的样本，记为 $N_K(x)$。
    - **步骤 3：预测结果**
        - 分类任务：统计 $N_K(x)$ 中各类别的出现次数，选择票数最多的类别作为 $x$ 的预测标签。
        - 回归任务：计算 $N_K(x)$ 中 $y_i$ 的平均值作为 $x$ 的预测值。
    - **无迭代**：KNN 不需要训练过程，所有计算在预测时完成。
   > 解释：KNN 的时间复杂度主要取决于距离计算和排序，通常为 $O(n \cdot d + n \log n)$。

4. Step4：参数选择与优化

   KNN 的性能依赖于参数 $K$ 和距离度量的选择：
    - **$K$ 值选择**：
        - $K$ 过小：模型对噪声敏感，容易过拟合。
        - $K$ 过大：模型过于平滑，可能欠拟合。
        - 常用方法：通过交叉验证选择最优 $K$。
    - **距离加权（Weighted KNN）**：改进方法，根据距离远近对邻居的贡献加权：
      $$
      y = \arg\max_c \sum_{i \in N_K(x)} w_i I(y_i = c), \quad w_i = \frac{1}{d(x, x_i)^2}
      $$
      或回归：
      $$
      y = \frac{\sum_{i \in N_K(x)} w_i y_i}{\sum_{i \in N_K(x)} w_i}
      $$
    - **数据预处理**：由于距离对特征尺度敏感，需对数据进行标准化（如 Z-score 归一化）。
   > 解释：合理的 $K$ 和距离度量能显著提升 KNN 的准确性。

5. Step5：评估与局限性

   KNN 的效果可以通过多种指标评估：
    - **分类评估**：准确率（Accuracy）、精确率（Precision）、召回率（Recall）、F1 分数。
    - **回归评估**：均方误差（MSE）、平均绝对误差（MAE）。
    - **优缺点**：
        - 优点：简单直观，适用于小规模数据集，无需训练。
        - 缺点：对大规模数据计算开销大（需存储所有训练样本），对异常值和不平衡数据敏感。
   > [!tip]
   > KNN 假设特征空间中距离反映样本相似性，适用于数据分布均匀的场景。
   >
   > Tips：[KNN 实现](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html) 可参考 scikit-learn 提供的实现。
   :::

### 代码示例
:::code-tabs
@tab KNN.py
```python
from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# 训练数据集
learning_dataset = {
    "宝贝当家": [45, 2, 9, "喜剧片"],
    "美人鱼": [21, 17, 5, "喜剧片"],
    "澳门风云3": [54, 9, 11, "喜剧片"],
    "功夫熊猫3": [39, 0, 31, "喜剧片"],
    "谍影重重": [5, 2, 57, "动作片"],
    "叶问3": [3, 2, 65, "动作片"],
    "伦敦陷落": [2, 3, 55, "动作片"],
    "我的特工爷爷": [6, 4, 21, "动作片"],
    "奔爱": [7, 46, 4, "爱情片"],
    "夜孔雀": [9, 38, 8, "爱情片"],
    "代理情人": [9, 38, 2, "爱情片"],
    "新步步惊心": [8, 34, 17, "爱情片"]
}

test_data = {"老友记": [29, 10, 2, "？片"]}

X_train = np.array([data[:3] for data in learning_dataset.values()])
y_train = np.array([data[3] for data in learning_dataset.values()])
X_test = np.array([test_data["老友记"][:3]])

# 创建KNN分类器
knn = KNeighborsClassifier(n_neighbors=1, metric='euclidean')
# 数据拟合
knn.fit(X_train, y_train)

y_pred = knn.predict(X_test)
test_data["老友记"][3] = y_pred[0]

print(f"预测结果：{test_data}")
```
:::