---
title: 支持向量机
createTime: 2025/02/28 21:12:17
permalink: /python/ki9q54ly/
---
### 步骤分析
::: steps
1. Step1：分类问题概述  
   支持向量机是一种监督学习方法，用于分类或回归任务（主要用于分类）。其目标是找到一个最优超平面，将不同类别的样本分隔开，同时最大化类别之间的间隔（margin）。SVM 通过平衡分类准确性和泛化能力，特别适用于高维数据和非线性可分问题。

2. Step2：SVM 模型
    - 数据集：$X = \{x_1, x_2, \dots, x_n\}$，其中 $x_i \in \mathbb{R}^d$ 是 $d$ 维特征向量，$y_i \in \{-1, 1\}$ 是对应的二分类标签。
    - 超平面：定义为 $w^T x + b = 0$，其中 $w$ 是法向量，$b$ 是偏置。
    - 支持向量：距离超平面最近的样本点，满足 $w^T x_i + b = \pm 1$。
    - 间隔（Margin）：两类支持向量之间的距离，计算为 $\frac{2}{\|w\|}$，其中 $\|w\| = \sqrt{w^T w}$。
    @[bilibili](BV16T4y1y7qj)
    - ==目标函数=={.important}：最大化间隔，即最小化 $\frac{1}{2}\|w\|^2$，同时满足约束：  
      $$
      y_i (w^T x_i + b) \geq 1, \quad i = 1, 2, \dots, n
      $$
    - 优化问题（硬间隔 SVM）：  
      $$
      \min_{w, b} \frac{1}{2}\|w\|^2 \quad \text{s.t.} \quad y_i (w^T x_i + b) \geq 1
      $$
   > 解释：$\frac{1}{2}\|w\|^2$ 控制超平面复杂度，约束确保所有样本被正确分类且在间隔外。

3. Step3：算法流程  
   SVM 通过求解优化问题找到最优超平面，主要步骤如下：

   ==**步骤 1：拉格朗日对偶问题**==  
      为解决带约束优化，引入拉格朗日乘子 $\alpha_i \geq 0$，构造拉格朗日函数：  
      $$
      L(w, b, \alpha) = \frac{1}{2}\|w\|^2 - \sum_{i=1}^n \alpha_i [y_i (w^T x_i + b) - 1]
      $$  
      对 $w$ 和 $b$ 求偏导并令其为零：  
      $$
      w = \sum_{i=1}^n \alpha_i y_i x_i, \quad \sum_{i=1}^n \alpha_i y_i = 0
      $$  
      代入后转化为对偶问题：  
      $$
      \max_{\alpha} \sum_{i=1}^n \alpha_i - \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n \alpha_i \alpha_j y_i y_j x_i^T x_j
      $$  
      约束：$\alpha_i \geq 0$ 且 $\sum_{i=1}^n \alpha_i y_i = 0$。

   ==**步骤 2：求解 $\alpha$**== 

      使用数值优化方法（如 SMO 算法）求解对偶问题，得到最优 $\alpha_i^*$。  
      其中，$\alpha_i^* > 0$ 的样本为支持向量。
   
   ==**步骤 3：计算 $w$ 和 $b$**==

   根据支持向量计算：  
      $$
      w^* = \sum_{i=1}^n \alpha_i^* y_i x_i
      $$  
      选择一个支持向量 $(x_s, y_s)$（满足 $\alpha_s^* > 0$），计算偏置：  
      $$
      b^* = y_s - w^{*T} x_s
      $$
   ==**步骤 4：预测**==  
      对新样本 $x$，预测类别为：  
      $$
      f(x) = \text{sign}(w^{*T} x + b^*)
      $$

4. Step4：软间隔与核技巧
    - **软间隔 SVM**（处理线性不可分）：  
      引入松弛变量 $\xi_i \geq 0$ 和惩罚参数 $C$，优化目标变为：  
      $$
      \min_{w, b, \xi} \frac{1}{2}\|w\|^2 + C \sum_{i=1}^n \xi_i
      $$  
      约束：$y_i (w^T x_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0$。  
      对偶问题修改为：  
      $$
      \max_{\alpha} \sum_{i=1}^n \alpha_i - \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n \alpha_i \alpha_j y_i y_j x_i^T x_j
      $$  
      约束：$0 \leq \alpha_i \leq C$ 且 $\sum_{i=1}^n \alpha_i y_i = 0$。
    - **核技巧**（处理非线性）：  
      将数据映射到高维空间，用核函数 $K(x_i, x_j)$ 替代 $x_i^T x_j$：  
      对偶问题变为：  
      $$
      \max_{\alpha} \sum_{i=1}^n \alpha_i - \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n \alpha_i \alpha_j y_i y_j K(x_i, x_j)
      $$  
      常用核函数：
        - 线性核：$K(x_i, x_j) = x_i^T x_j$
        - 多项式核：$K(x_i, x_j) = (x_i^T x_j + 1)^p$
        - 高斯核（RBF）：$K(x_i, x_j) = \exp(-\gamma \|x_i - x_j\|^2)$
   > 解释：软间隔允许一定误分类，核技巧使 SVM 适用于非线性数据。

5. Step5：优化与评估
    - **参数优化**：
        - $C$：控制间隔大小与误分类的权衡，$C$ 越大越强调正确分类。
        - 核参数（如 RBF 的 $\gamma$）：影响模型复杂度，需调优。
    - **评估方法**：
        - 准确率：正确分类的样本比例。
        - 混淆矩阵：分析各类别预测效果。
        - ROC 和 AUC：评估二分类性能。
        - 交叉验证：如 5 折交叉验证，评估泛化能力。
   > [!tip]  
   > SVM 对特征缩放敏感，建议标准化数据；高维数据计算复杂度较高。  
   > Tips：[SVM 实现](https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html) 可参考 scikit-learn 的 SVC。
   :::