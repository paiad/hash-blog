---
title: 聚类算法
createTime: 2025/02/24 10:08:04
permalink: /python/ol2i7fiq/
---
<ImageCard
title = "http://naftaliharris.com/blog/visualizing-k-means-clustering"
image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/ml/clustering-e3.png"
href = "http://naftaliharris.com/blog/visualizing-k-means-clustering"
description="聚类可视化平台，(页面用图形（如 Voronoi 图）展示过程，旨在帮助学习者直观理解 K-means 算法，属于教育性质的个人技术博客内容。"
/>

### K-means 步骤分析
::: steps
1. Step1：聚类问题概述

   ==K-means==算法是一种无监督学习方法，用于将数据集划分为 $K$ 个簇（clusters）。目标是根据样本的特征，将相似的样本分配到同一个簇，使得簇内样本尽可能相似，簇间样本尽可能不同。K-means 通过最小化簇内方差（即样本到簇中心的距离平方和）来实现聚类。

2. Step2：K-means 模型

   ==目标函数（损失函数）=={.important}：最小化簇内平方和（Within-Cluster Sum of Squares, WCSS）：
   $$
   J = \sum_{i=1}^n \sum_{k=1}^K r_{ik} \| x_i - \mu_k \|^2
   $$
   其中，$r_{ik}$ 是一个指示变量：
   - 若 $x_i$ 属于簇 $k$，则 $r_{ik} = 1$；
   - 否则，$r_{ik} = 0$。
   >数据集：$X = \{x_1, x_2, \dots, x_n\}$，其中 $x_i \in \mathbb{R}^d$ 是 $d$ 维特征向量。
   > 
   >簇数量：$K$，需预先指定。
   > 
   >簇中心：$\mu_k$，表示第 $k$ 个簇的质心，$k = 1, 2, \dots, K$。
   > 
   >分配标签：$c_i$，表示样本 $x_i$ 所属的簇，$c_i \in \{1, 2, \dots, K\}$。

   > 解释：$\| x_i - \mu_k \|^2$ 是样本 $x_i$ 到簇中心 $\mu_k$ 的欧几里得距离平方，$J$ 表示所有样本到其所属簇中心的总距离平方和。

3. Step3：算法流程

   K-means 采用迭代优化的方式实现聚类
   <CardGrid>
   <ImageCard
   image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/ml/clustering-e2.png"
   />
   <ImageCard
   image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/ml/clustering-e1.png"
   />
   </CardGrid>
   主要包括以下三个步骤：

   ==步骤 1=={.important}：分配样本到最近的簇中心
      对于每个样本 $x_i$，计算其与所有簇中心 $\mu_k$ 的距离，选择距离最小的簇：
      $$
      c_i = \arg\min_k \| x_i - \mu_k \|^2
      $$
      更新指示变量 $r_{ik}$：
        - 若 $c_i = k$，则 $r_{ik} = 1$；
        - 否则，$r_{ik} = 0$。

   ==步骤 2=={.important}：更新簇中心
      根据当前分配的样本，重新计算每个簇的中心（取均值）：
      $$
      \mu_k = \frac{\sum_{i=1}^n r_{ik} x_i}{\sum_{i=1}^n r_{ik}}
      $$
      其中，分母 $\sum_{i=1}^n r_{ik}$ 是簇 $k$ 中的样本数量。

   ==步骤 3=={.important}：迭代，重复上述步骤，直到簇中心 $\mu_k$ 不再变化（收敛）或达到最大迭代次数。

4. Step4：初始化与收敛

   K-means 的性能高度依赖初始簇中心的选择：
    - **随机初始化**：随机选择 $K$ 个样本作为初始簇中心。
    - **K-means++ 初始化**：改进方法，通过逐步选择初始中心以避免局部最优：
        1. 随机选择第一个簇中心 $\mu_1$。
        2. 对于每个样本 $x_i$，计算其与已有簇中心的最小距离 $D(x_i)$。
        3. 以概率 $\frac{D(x_i)^2}{\sum D(x_j)^2}$ 选择下一个簇中心。
        4. 重复直到选出 $K$ 个中心。
    - **收敛性**：由于 $J$ 是非增函数，每次迭代都会减少或保持 $J$ 不变，最终收敛到局部最优解。
   > 解释：K-means 不保证全局最优解，结果可能因初始化不同而变化。

5. Step5：优化与评估

   K-means 的目标是最小化 $J$，但需要选择合适的 $K$ 值：

   ==**肘部法则（Elbow Method）**==：绘制 $K$ 与 $J$ 的关系曲线，选择 $J$ 下降趋于平缓的 $K$ 值。
   <ImageCard
   image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/ml/clustering-elbow-method-e1.png"
   width = 70%
   center = true
   />

   ==**轮廓系数（Silhouette Score）**==：衡量簇内紧密度与簇间分离度的指标，取值范围 $[-1, 1]$，越高越好。
   <ImageCard
   image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/ml/clustering-silhouette-score-e1.png"
   width = 70%
   center = true
   />

    - 计算公式：
      $$
      s(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}
      $$
      其中：
        - $a(i)$：样本 $i$ 与同一簇内其他样本的平均距离；
        - $b(i)$：样本 $i$ 与最近的其他簇的平均距离。
   > [!tip]
   > K-means 假设簇是球形且大小相似，对噪声和异常值敏感。
   >
   > Tips：[K-means 实现](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html) 可参考 scikit-learn 提供的实现。
:::

::: code-tabs
@tab clustering-algorithm.py
```python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

matplotlib.use('TkAgg')
# 一些基础参数配置
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12

np.random.seed(42)

from sklearn.datasets import make_blobs

blobs_centers = np.array([
    [0.2, 2.3],
    [-1.5, 2.3],
    [-2.8, 1.8],
    [-2.8, 2.8],
    [-2.8, 1.3],
])

blob_std = np.array([0.4, 0.3, 0.1, 0.1, 0.1])

X, y = make_blobs(n_samples=200, centers=blobs_centers, cluster_std=blob_std, random_state=8)


def plot_clusters(X, y=None):
    plt.scatter(X[:, 0], X[:, 1], c=y, s=1)
    plt.xlabel("$X_1$", fontsize=14)
    plt.ylabel("$X_2$", fontsize=14, rotation=0)


plt.figure(figsize=(8, 4))
plot_clusters(X)
plt.show()

from sklearn.cluster import KMeans

k = 5
kmeans = KMeans(n_clusters=k, random_state=42)
# 得到预测结果
y_pred = kmeans.fit_predict(X)

print(y_pred, kmeans.cluster_centers_)

X_new = np.array([[0, 2], [3, 2], [-3, 3], [-3.2, 5]])
kmeans.predict(X_new)


# 绘图函数
def plot_data(X):
    plt.plot(X[:, 0], X[:, 1], 'k.', markersize=2)


def plot_centroids(centroids, weights=None, circle_color='w', cross_color='r'):
    if weights is not None:
        centroids = centroids[weights > weights.max() / 10]
    plt.scatter(centroids[:, 0],
                centroids[:, 1], marker='o', s=30, linewidths=8, color=circle_color, zorder=10, alpha=0.9)
    plt.scatter(centroids[:, 0],
                centroids[:, 1], marker='x', s=50, linewidths=1, color=cross_color, zorder=11, alpha=1.0)


def plot_decision_boundary(clusterer, X, resolution=1000, show_centroids=True, show_xlabels=True, show_ylabels=True):
    mins = X.min(axis=0) - 0.1
    maxs = X.max(axis=0) + 0.1
    xx, yy = np.meshgrid(np.linspace(mins[0], maxs[0], resolution), np.linspace(mins[1], maxs[1], resolution))
    Z = clusterer.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)

    plt.contourf(Z, extent=[mins[0], maxs[0], mins[1], maxs[1]], cmap="Pastel2")
    plt.contour(Z, extent=[mins[0], maxs[0], mins[1], maxs[1]], linewidths=1, colors='k')
    plot_data(X)
    if show_centroids:
        plot_centroids(clusterer.cluster_centers_)

    if show_xlabels:
        plt.xlabel("$x_1$", fontsize=14)
    else:
        plt.tick_params(labelbottom='off')
    if show_ylabels:
        plt.ylabel("$x_2$", fontsize=14, rotation=0)
    else:
        plt.tick_params(labelleft='off')


# 绘图
plt.figure(figsize=(8, 4))
plot_decision_boundary(kmeans, X)
plt.show()

kmeans_iter1 = KMeans(n_clusters=5, init='random', n_init=1, max_iter=1, random_state=42)
kmeans_iter2 = KMeans(n_clusters=5, init='random', n_init=1, max_iter=2, random_state=42)
kmeans_iter3 = KMeans(n_clusters=5, init='random', n_init=1, max_iter=3, random_state=42)

kmeans_iter1.fit(X)
kmeans_iter2.fit(X)
kmeans_iter3.fit(X)

plt.figure(figsize=(10, 8))

plt.subplot(321)
plot_data(X)
plot_centroids(kmeans_iter1.cluster_centers_, circle_color='r', cross_color='k')
plt.title("Update cluster_centers")

plt.subplot(322)
plot_decision_boundary(kmeans_iter1, X, resolution=1000, show_xlabels=False, show_ylabels=False)
plt.title("Label")

plt.subplot(323)
plot_decision_boundary(kmeans_iter1, X, resolution=1000, show_xlabels=False, show_ylabels=False)
plot_centroids(kmeans_iter2.cluster_centers_, circle_color='r', cross_color='k')

plt.subplot(324)
plot_decision_boundary(kmeans_iter2, X, resolution=1000, show_xlabels=False, show_ylabels=False)

plt.subplot(325)
plot_decision_boundary(kmeans_iter2, X, resolution=1000, show_xlabels=False, show_ylabels=False)
plot_centroids(kmeans_iter3.cluster_centers_, circle_color='r', cross_color='k')

plt.subplot(326)
plot_decision_boundary(kmeans_iter3, X, resolution=1000, show_xlabels=False, show_ylabels=False)

plt.show()

# 肘部法则
kmeans_per_k = [KMeans(n_clusters=k).fit(X) for k in range(1, 10)]
inertia = [model.inertia_ for model in kmeans_per_k]
plt.figure(figsize=(8, 4))
plt.plot(range(1, 10), inertia, 'bo-')
plt.show()

# 轮廓系数
from sklearn.metrics import silhouette_score

silhouette_score(X, kmeans.labels_)
# 去除k = 1时的这种情况
silhouette_scores = [silhouette_score(X, model.labels_) for model in kmeans_per_k[1:]]
plt.figure(figsize=(8, 4))
plt.plot(range(2, 10), silhouette_scores, 'bo-')
plt.show()

```
:::


### DBSCAN 步骤分析
::: steps
1. **Step 1：聚类问题概述**
2. 
   ==DBSCAN==(Density-Based Spatial Clustering of Applications with Noise)是一种基于密度的无监督聚类算法，用于在数据集中发现任意形状的簇，并能够识别噪声点。它的核心思想是通过样本的密度分布，将高密度区域划分为簇，低密度区域标记为噪声。DBSCAN 特别适合处理非球形簇和不均匀大小的簇，不需要预先指定簇数量 $K$。

2. **Step 2：DBSCAN 模型**

   - **数据集**：$X = \{x_1, x_2, \dots, x_n\}$，其中 $x_i \in \mathbb{R}^d$ 是 $d$ 维特征向量。
   - **关键参数**：
      - $\epsilon$（eps）：邻域半径，定义一个样本周围的距离阈值，用于判断样本是否足够接近。
      - $\text{MinPts}$：最小点数，指定一个簇中必须包含的最小样本数量，以区分核心点和噪声。
   - **核心概念**：
      - **核心点**：若样本 $x_i$ 的 $\epsilon$-邻域（距离 $x_i$ 内的所有点）包含至少 $\text{MinPts}$ 个样本（包括 $x_i$ 本身），则 $x_i$ 是核心点。
      - **边界点**：位于核心点的 $\epsilon$-邻域内，但其自身的 $\epsilon$-邻域中样本数量不足 $\text{MinPts}$。
      - **噪声点**：既不是核心点也不是边界点的样本。
   - **目标**：通过密度连接（Density-Connected）将核心点及其邻域的样本聚类为簇，噪声点不属于任何簇。

3. **Step 3：算法流程**

   DBSCAN 采用基于密度的迭代方式实现聚类，主要包括以下步骤：
   - **步骤 1：初始化未访问样本**
     将所有样本标记为“未访问”（未被处理）。
   - **步骤 2：随机选择未访问样本**
     从未访问的样本中随机挑选一个样本 $x_i$，标记为“已访问”。
   - **步骤 3：找到 $\epsilon$-邻域**
     计算 $x_i$ 的 $\epsilon$-邻域（即所有距离 $x_i$ 小于 $\epsilon$ 的样本）。
      - 如果 $\epsilon$-邻域中的样本数量 $\geq \text{MinPts}$，则 $x_i$ 是核心点：
         - 创建一个新簇，将 $x_i$ 及其 $\epsilon$-邻域内的所有样本加入该簇。
         - 递归地检查这些样本的 $\epsilon$-邻域，扩展簇（密度连接）。
      - 如果 $\epsilon$-邻域中的样本数量 $< \text{MinPts}$，则 $x_i$ 标记为噪声点（但后续可能被其他核心点的邻域吸收为边界点）。
   - **步骤 4：重复**
     继续从剩余的未访问样本中选择，重复步骤 2 和 3，直到所有样本被访问。
   - **输出**：生成多个簇和可能的噪声点。

4. **Step 4：初始化与收敛**

   DBSCAN 的性能依赖于参数 $\epsilon$ 和 $\text{MinPts}$ 的选择：
   - **参数选择**：
      - $\epsilon$ 通常通过可视化数据分布或计算距离分布（如 k-距离图）确定，k 通常取 $\text{MinPts}$。
      - $\text{MinPts}$ 应根据数据维度和密度选择，建议至少为 $d+1$（$d$ 是特征维度），以捕捉噪声和异常值。
   - **优点**：不需要预先指定簇数量 $K$，能发现任意形状的簇，并处理噪声。
   - **缺点**：对参数敏感，计算复杂度较高（O(n²) 或 O(n log n) 使用索引如 KD-Tree/R-Tree）。
   - **收敛性**：DBSCAN 是确定性算法，运行一次即可生成最终结果，无需迭代。

5. **Step 5：优化与评估**

   DBSCAN 的目标是基于密度发现自然簇，并可通过以下方法优化和评估：
   - **参数调优**：
      - 使用 k-距离图（k-dist plot）：对每个样本计算到第 k 个最近邻的距离，按升序排序，寻找“膝点”（knee point）作为 $\epsilon$ 的值，其中 k 通常取 $\text{MinPts}$。
      - 调整 $\text{MinPts}$：增大 $\text{MinPts}$ 会减少噪声点，但可能合并小簇；减小 $\text{MinPts}$ 会增加噪声点，但可能发现更多小簇。
   - **评估指标**：
      - **轮廓系数（Silhouette Score）**：衡量簇内紧密度和簇间分离度，取值范围 $[-1, 1]$，越高越好（与 K-means 类似）。
      - **调整后的兰德指数（Adjusted Rand Index, ARI）**：如果有真实标签（Ground Truth），可以用 ARI 评估聚类质量。
   - **局限性**：
      - 对数据密度不均匀敏感（不同簇的密度差异大时，难以选择合适的 $\epsilon$ 和 $\text{MinPts}$）。
      - 对高维数据或稀疏数据可能表现不佳，可结合降维（如 PCA）或使用优化版本（如 HDBSCAN）。
   > [!tip]
   > DBSCAN 适合处理噪声和非线性簇，但对参数选择和计算效率敏感。
   >
   > Tips：[DBSCAN 实现](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html) 可参考 scikit-learn 提供的实现。
   :::
