---
title: 线性回归
createTime: 2025/01/31 23:37:06
permalink: /python/cdvav9jp/
#aside: false
---
### 步骤分析
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

   $\epsilon_i$服从均值为零的正态分布，即$\epsilon_i \sim N(0,\sigma^{2})$
   
   $$
   P(\varepsilon_{i})=\frac{1}{\sqrt{2\pi}\sigma}exp(-\frac{\varepsilon_{i}^{2}}{2\sigma^{2}})
   $$
   - 均值为零：表示误差项的平均影响为零，即正误差和负误差在长期中会相互抵消。
   - 方差为$\sigma^2$: 给定一组数据值与均值之间差异的平方的平均值为$\sigma^2$(数据的集中程度)

4. Step4：极大似然估计求解$\hat w$
    $$P(y_i | x_i; \hat w)=\frac{1}{\sqrt{2\pi}\sigma}exp(-\frac{(y_i-X\hat w)^2}{2\sigma^{2}})$$

   >解释：将$P(\varepsilon_{i})$转化为关于$\hat w$的函数，目的是为了求解出$\hat w$。
   > 
   >在给定输入$x_i$、$\hat w$的条件下，输出$y_i$的条件概率
   - 极大似然估计
   $$\begin{array} {rcl}L(\hat w) & = & \prod\limits_{i=1}^mp(y_{i}\mid x_{i};\hat w) & = & \prod\limits_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(y_{i}-X\hat w)^2}{2\sigma^2}\right) \end{array}$$
   $$\ln L(\hat w)=\ln\prod_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(y_{i}-X\hat w)^2}{2\sigma^2}\right)=m\ln\frac{1}{\sqrt{2\pi}\sigma}-\frac{1}{2\sigma^2}\sum_{i=1}^{m}(y_{i}-X\hat w)^2$$
   >为了使每一个$y_i$的值出现的概率尽可能大(所有$y_i$的乘积最大)，所以要有$\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$尽可能小。

5. Step5：最后得到$\hat w$的值

   对函数$\frac{1}{m}\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$求$\hat w$的偏导以求其最小值，这里运用线性代数的知识：
    >1. $\alpha$为矩阵，则有$\alpha^{2}=\alpha^{T}\alpha$
    >2. $\frac{\partial \hat w^TX^TX\hat w}{\partial \hat w}=X^TX\hat w$

   最后令偏导为0，化简得:$\hat w^*=\left(X^TX\right)^{-1}X^Ty$
   >[!tip]
   > $\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$事实上为每一个X对应的拟合后平面的值与其真实值之间的差值的平方之和，
   >
   >我们需要做的就是怎么调整$\hat w$，使这个平方之和最小。
   >
   >tips：[普通最小二乘法（OLS）](https://scikit-learn.org/stable/auto_examples/linear_model/plot_ols.html)是一种通过最小化数据点和回归模型之间误差的平方和来求解回归模型参数的方法，即使MSE最小化。(MSE: 均方误差)
   > 以几何的角度来说，最小二乘法就是在多维空间中找到一个最优的超平面，使得数据点与该超平面之间的误差最小化。
:::

### 简单线性回归代码示例
<CardGrid>
<ImageCard
    image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/lin-reg-1.png"
    title ="原始数据"
/>
<ImageCard
    image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/lin-reg-2.png"
    title="线性拟合"
/>
</CardGrid>

::: code-tabs
@tab linear_regression.py
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

X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

plt.plot(X, y, 'b.')
plt.xlabel('X_1')
plt.ylabel('y')
plt.axis([0, 2, 0, 15])
plt.show()

X_b = np.c_[np.ones((100, 1)), X] # 加入偏置项
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)
print("通过最小二乘法计算的权重：\n",theta_best)

X_new = np.array([[0],[2]])
X_new_b = np.c_[np.ones((2, 1)), X_new]
y_predict = X_new_b.dot(theta_best)
print("通过最小二乘法预测的数据(x=2 和 x=9)：\n", y_predict)

plt.plot(X_new, y_predict, 'r--')
plt.plot(X, y, 'b.')
plt.axis([0, 2, 0, 15])
plt.show()

"""
通过sklearn工具包的LinearRegression库实现的线性回归算法
"""
from sklearn.linear_model import LinearRegression
lin_reg = LinearRegression()
lin_reg.fit(X,y)

print("========通过sklearn工具包的LinearRegression库========")
print("k=", lin_reg.coef_)
print("b=", lin_reg.intercept_)
```
:::

### 案例（糖尿病数据集）
:::code-tabs
@tab plot_ols_cn.py
``` python
"""
==============================
Ordinary Least Squares Example
最小二乘法示例
==============================

This example shows how to use the ordinary least squares (OLS) model
called :class:`~sklearn.linear_model.LinearRegression` in scikit-learn.
这个例子向我们展示如何在scikit-learn使用最小二乘法模型。

For this purpose, we use a single feature from the diabetes dataset and try to
predict the diabetes progression using this linear model. We therefore load the
diabetes dataset and split it into training and test sets.
为了达到这个目的，我们从糖尿病数据集中利用了一个特征和尝试用线性模型去预测糖尿病进程。因此
我们加载了这个糖尿病数据集并将他们分为了训练集和测试集。

Then, we fit the model on the training set and evaluate its performance on the test
set and finally visualize the results on the test set.
之后，我们利用模型对训练集进行拟合并在测试集中评估他的性能，最后可视化测试集结果。
"""

# %%
# Data Loading and Preparation
# 数据加载与预处理
# ----------------------------
#
# Load the diabetes dataset. For simplicity, we only keep a single feature in the data.
# Then, we split the data and target into training and test sets.
# 加载糖尿病数据集。为了简化，我们只保留了数据中的一个特征。
# 之后我们将数据和目标分为了训练集和测试集。

import matplotlib
matplotlib.use('TkAgg')
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
# X 是特征矩阵，包含多个特征（列）； y 是目标向量，表示糖尿病进展的定量测量
X, y = load_diabetes(return_X_y=True) # 加载糖尿病数据集
X = X[:, [2]]  # Use only one feature
# 测试集包含 20 个样本，且不进行随机打乱
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=20, shuffle=False) 

# %%
# Linear regression model
# 线性回归模型
# -----------------------
#
# We create a linear regression model and fit it on the training data. Note that by
# default, an intercept is added to the model. We can control this behavior by setting
# the `fit_intercept` parameter.
# 我们创建了一个线性回归模型并将它用在训练集上进行数据拟合。
# 默认情况下，模型会添加一个截距。我们可以通过设置这个`fit_intercept`参数控制这一行为。

from sklearn.linear_model import LinearRegression
# 线性回归，进行数据拟合
regressor = LinearRegression().fit(X_train, y_train)

# %%
# Model evaluation
# 模型评价
# ----------------
#
# We evaluate the model's performance on the test set using the mean squared error
# and the coefficient of determination.
# 我们使用均方误差和确定系数评估这个模型在测试集上的表现。


from sklearn.metrics import mean_squared_error, r2_score

y_pred = regressor.predict(X_test)

print(f"Mean squared error: {mean_squared_error(y_test, y_pred):.2f}")
print(f"Coefficient of determination: {r2_score(y_test, y_pred):.2f}")

# %%
# Plotting the results
# --------------------
#
# Finally, we visualize the results on the train and test data.
import matplotlib.pyplot as plt

fig, ax = plt.subplots(ncols=2, figsize=(10, 5), sharex=True, sharey=True)

ax[0].scatter(X_train, y_train, label="Train data points")
ax[0].plot(
    X_train,
    regressor.predict(X_train),
    linewidth=3,
    color="tab:orange",
    label="Model predictions",
)
ax[0].set(xlabel="Feature", ylabel="Target", title="Train set")
ax[0].legend()

ax[1].scatter(X_test, y_test, label="Test data points")
ax[1].plot(X_test, y_pred, linewidth=3, color="tab:orange", label="Model predictions")
ax[1].set(xlabel="Feature", ylabel="Target", title="Test set")
ax[1].legend()

fig.suptitle("Linear Regression")

plt.show()

# %%
# Conclusion
# ----------
#
# The trained model corresponds to the estimator that minimizes the mean squared error
# between the predicted and the true target values on the training data. We therefore
# obtain an estimator of the conditional mean of the target given the data.
#
# Note that in higher dimensions, minimizing only the squared error might lead to
# overfitting. Therefore, regularization techniques are commonly used to prevent this
# issue, such as those implemented in :class:`~sklearn.linear_model.Ridge` or
# :class:`~sklearn.linear_model.Lasso`.

```

@tab plot_ols.py
``` python
"""
==============================
Ordinary Least Squares Example
==============================

This example shows how to use the ordinary least squares (OLS) model
called :class:`~sklearn.linear_model.LinearRegression` in scikit-learn.

For this purpose, we use a single feature from the diabetes dataset and try to
predict the diabetes progression using this linear model. We therefore load the
diabetes dataset and split it into training and test sets.

Then, we fit the model on the training set and evaluate its performance on the test
set and finally visualize the results on the test set.
"""
# Authors: The scikit-learn developers
# SPDX-License-Identifier: BSD-3-Clause

# %%
# Data Loading and Preparation
# ----------------------------
#
# Load the diabetes dataset. For simplicity, we only keep a single feature in the data.
# Then, we split the data and target into training and test sets.
import matplotlib
matplotlib.use('TkAgg')
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
X, y = load_diabetes(return_X_y=True)
X = X[:, [2]]  # Use only one feature
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=20, shuffle=False)

# %%
# Linear regression model
# -----------------------
#
# We create a linear regression model and fit it on the training data. Note that by
# default, an intercept is added to the model. We can control this behavior by setting
# the `fit_intercept` parameter.
from sklearn.linear_model import LinearRegression

regressor = LinearRegression().fit(X_train, y_train)

# %%
# Model evaluation
# ----------------
#
# We evaluate the model's performance on the test set using the mean squared error
# and the coefficient of determination.
from sklearn.metrics import mean_squared_error, r2_score

y_pred = regressor.predict(X_test)

print(f"Mean squared error: {mean_squared_error(y_test, y_pred):.2f}")
print(f"Coefficient of determination: {r2_score(y_test, y_pred):.2f}")

# %%
# Plotting the results
# --------------------
#
# Finally, we visualize the results on the train and test data.
import matplotlib.pyplot as plt

fig, ax = plt.subplots(ncols=2, figsize=(10, 5), sharex=True, sharey=True)

ax[0].scatter(X_train, y_train, label="Train data points")
ax[0].plot(
    X_train,
    regressor.predict(X_train),
    linewidth=3,
    color="tab:orange",
    label="Model predictions",
)
ax[0].set(xlabel="Feature", ylabel="Target", title="Train set")
ax[0].legend()

ax[1].scatter(X_test, y_test, label="Test data points")
ax[1].plot(X_test, y_pred, linewidth=3, color="tab:orange", label="Model predictions")
ax[1].set(xlabel="Feature", ylabel="Target", title="Test set")
ax[1].legend()

fig.suptitle("Linear Regression")

plt.show()

# %%
# Conclusion
# ----------
#
# The trained model corresponds to the estimator that minimizes the mean squared error
# between the predicted and the true target values on the training data. We therefore
# obtain an estimator of the conditional mean of the target given the data.
#
# Note that in higher dimensions, minimizing only the squared error might lead to
# overfitting. Therefore, regularization techniques are commonly used to prevent this
# issue, such as those implemented in :class:`~sklearn.linear_model.Ridge` or
# :class:`~sklearn.linear_model.Lasso`.

:::