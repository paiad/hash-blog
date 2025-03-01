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
   > 极大似然估计（Maximum Likelihood Estimation，简称 MLE）是一种统计估计方法，旨在通过选择参数值使得观测数据在该参数下出现的概率最大化。它是基于数据的已知分布模型来估计未知参数的一种常用方法。
   $$\begin{array} {rcl}L(\hat w) & = & \prod\limits_{i=1}^mp(y_{i}\mid x_{i};\hat w) & = & \prod\limits_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(y_{i}-X\hat w)^2}{2\sigma^2}\right) \end{array}$$
   $$\ln L(\hat w)=\ln\prod_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(y_{i}-X\hat w)^2}{2\sigma^2}\right)=m\ln\frac{1}{\sqrt{2\pi}\sigma}-\frac{1}{2\sigma^2}\sum_{i=1}^{m}(y_{i}-X\hat w)^2$$
   >为了使每一个$y_i$的值出现的概率尽可能大(所有$y_i$的乘积最大)，所以要有$\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$尽可能小。

5. Step5：最后得到$\hat w$的值

   对于函数损失函数$J(\hat w) = \frac{1}{m}\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$求$\hat w$的偏导以求其最小值，这里运用线性代数的知识：
    >1. $\alpha$为矩阵，则有$\alpha^{2}=\alpha^{T}\alpha$
    >2. $\frac{\partial \hat w^TX^TX\hat w}{\partial \hat w}=X^TX\hat w$

    >$$J(\hat{w}) = \frac{1}{m} \sum_{i=1}^{m} (X \hat{w} - y_i)^2 \tag{1}$$
    >$$J(\hat{w}) = \frac{1}{m} \| X \hat{w} - y \|^2 \tag{2}$$
    >
    >$$J(\hat{w}) = \frac{1}{m} (X \hat{w} - y)^T (X \hat{w} - y) \tag{3}$$
    >
    >$$\frac{\partial J(\hat{w})}{\partial \hat{w}} = \frac{2}{m} X^T (X \hat{w} - y) \tag{4}$$
    >
    >$$\frac{2}{m} X^T (X \hat{w} - y) = 0 \tag{5}$$
    >
    >$$X^T (X \hat{w} - y) = 0 \tag{6}$$
    >
    >$$X^T X \hat{w} = X^T y \tag{7}$$
    >
    >$$\hat{w} = (X^T X)^{-1} X^T y \tag{8}$$

   即令偏导为0，化简得:$\hat w^*=\left(X^TX\right)^{-1}X^Ty$
   >[!tip]
   > $\sum\limits_{i=1}^{m}(X\hat w-y_{i})^2$事实上为每一个X对应的拟合后平面的值与其真实值之间的差值的平方之和，
   >
   >我们需要做的就是怎么调整$\hat w$，使这个平方之和最小。
   >
   >tips：[普通最小二乘法（OLS）](https://scikit-learn.org/stable/auto_examples/linear_model/plot_ols.html)是一种通过最小化数据点和回归模型之间误差的平方和来求解回归模型参数的方法，即使MSE最小化。(MSE: 均方误差)
   > 以几何的角度来说，最小二乘法就是在多维空间中找到一个最优的超平面，使得数据点与该超平面之间的误差最小化。
:::

### 简单线性回归代码
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

### 多项式回归
<CardGrid>
<ImageCard
    image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/poly-e1.png"
    title ="原始数据"
/>
<ImageCard
    image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/poly-e3.png"
    title ="二次拟合"
/>
</CardGrid>
<ImageCard
    image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/poly-e2.png"
    title="多项式回归拟合"
    width="120%"
/>

:::code-tabs
@tab polynomial_regression.py
``` python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

matplotlib.use('TkAgg')
# 一些基础参数配置
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12

np.random.seed(42)

m = 100
X = 6 * np.random.rand(m, 1) - 3
y = 0.5 * X ** 2 + X + np.random.randn(m, 1)

# 绘制散点图
plt.plot(X, y, "b.")
plt.xlabel('X_1')
plt.ylabel('y')
plt.axis([-3, 3, -5, 9])
plt.show()

from sklearn.preprocessing import PolynomialFeatures

# 引入二次项特征
poly_features = PolynomialFeatures(degree=2, include_bias=False)

X_ploy = poly_features.fit_transform(X)  # X_ploy[x] = [x, x^2]

from sklearn.linear_model import LinearRegression

lin_reg = LinearRegression()
# 数据拟合
lin_reg.fit(X_ploy, y)

X_new = np.linspace(-3, 3, num=100).reshape(100, 1)
X_new_ploy = poly_features.transform(X_new)
y_new = lin_reg.predict(X_new_ploy)

plt.plot(X, y, "b.")
plt.plot(X_new, y_new, "r--")
plt.title("Polynomial Regression")
plt.xlabel('X')
plt.ylabel('y')
plt.axis([-3, 3, -5, 9])
plt.show()

# 针对不同的degree参数进行数据拟合
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
plt.figure(figsize=(12,6))
for style, width, degree in (('g-', 1, 100), ('b-', 1, 2), ('r-+', 1, 1)):
    poly_features = PolynomialFeatures(degree=degree, include_bias=False)
    std = StandardScaler()
    lin_reg = LinearRegression()
    poly_reg = Pipeline([('poly_features', poly_features), ('StandardScaler', std), ('LinearRegression', lin_reg)])
    poly_reg.fit(X, y)
    y_new = poly_reg.predict(X_new)
    plt.plot(X_new, y_new, style,label=str(degree) ,linewidth=width)
plt.plot(X, y, "b.")
plt.xlabel('X')
plt.ylabel('y')
plt.axis([-3, 3, -5, 9])
plt.legend(loc='upper right')
plt.show()
```
:::

### 数据样本数量对结果的影响
<ImageCard
    image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/training-set-size-e1.png"
    title ="数据样本数量对结果的影响"
    width = 70%
    center = true
/>

:::code-tabs
@tab training_set_size_influence.py
``` python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

matplotlib.use('TkAgg')
# 一些基础参数配置
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12

np.random.seed(42)

m = 100
X = 6 * np.random.rand(m, 1) - 3
y = 0.5 * X ** 2 + X + np.random.randn(m, 1)

from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
def plot_learning_curves(model, X, y):
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=1)
    train_errors, val_errors = [], []
    for m in range(1, len(X_train)):
        # 对于不同数量的测试数据，进行数据拟合
        model.fit(X_train[:m], y_train[:m])
        y_train_predict = model.predict(X_train[:m])
        y_val_predict = model.predict(X_val)
        # 训练集MSE & 验证机MSE    MSE: 均方误差
        train_errors.append(mean_squared_error(y_train[:m], y_train_predict[:m]))
        val_errors.append(mean_squared_error(y_val, y_val_predict))

    plt.plot(np.sqrt(train_errors), 'r-', linewidth=2, label='Train Error')
    plt.plot(np.sqrt(val_errors), 'b-', linewidth=3, label='Validation Error')
    plt.xlabel('Training Set Size')
    plt.ylabel('RMSE')
    plt.legend(loc='upper right')

lin_reg = LinearRegression()
plot_learning_curves(lin_reg, X, y)
plt.axis([0, 80, 0, 3])
plt.show()
```
:::

### 岭回归和Lasso(正则化)
<ImageCard
    image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/ridge-lasso-e1.png"
    title ="岭回归实验结果"
/>

>`岭回归:`
>$$
>\min_{\theta} \left( \sum_{i=1}^{m} (y_i - \mathbf{x}_i^T \boldsymbol{\theta})^2 + \alpha \sum_{j=1}^{n} \theta_j^2 \right)
>$$
>
>`Lasso:`
>$$
>\min_{\theta} \left( \sum_{i=1}^{m} (y_i - \mathbf{x}_i^T \boldsymbol{\theta})^2 + \alpha \sum_{j=1}^{n} |\theta_j| \right)
>$$
>
>- $y_i$ 是实际目标值。
>- ${x}_i$ 是输入特征向量。
>- $\theta$ 是模型参数向量。
>- $\alpha$ 是正则化参数，控制模型复杂度，防止过拟合。

#### 1. **L1 正则化（Lasso Regularization）**
- **定义**：L1 正则化通过在损失函数中添加模型参数的绝对值之和（L1 范数）来约束模型。
    - 公式：损失函数 = 原始损失（例如均方误差） + λ * Σ|w_i|
    - 其中：
        - `w_i` 是模型的参数（权重）。
        - `λ` 是一个超参数（正则化强度），控制正则化的强度。`λ` 越大，正则化的效果越强。

- **特点**：
    - **稀疏性**：L1 正则化倾向于让部分参数变为 0，从而产生稀疏模型（即许多权重为 0）。这在特征选择中非常有用，因为它可以帮助识别最重要的特征。
    - **几何解释**：L1 范数在参数空间中对应于一个菱形区域，优化过程会在菱形与损失函数的等高线相交处找到解，容易产生角点（即某些参数为 0）。
    - **适用场景**：当你希望模型具有稀疏性或需要特征选择时（例如高维数据），L1 正则化非常合适。

- **缺点**：
    - 对特征缩放敏感（不同特征的尺度差异可能会影响结果）。
    - 解可能不唯一（在某些情况下）。

---

#### 2. **L2 正则化（Ridge Regularization）**
- **定义**：L2 正则化通过在损失函数中添加模型参数的平方和（L2 范数）来约束模型。
    - 公式：损失函数 = 原始损失（例如均方误差） + λ * Σ(w_i²)
    - 其中：
        - `w_i` 是模型的参数（权重）。
        - `λ` 是一个超参数，控制正则化的强度。

- **特点**：
    - **平滑性**：L2 正则化倾向于让参数值变小（接近 0，但通常不会完全为 0），从而使模型权重分布更均匀，避免过拟合。
    - **几何解释**：L2 范数在参数空间中对应于一个圆形（或球形）区域，优化过程会在圆形与损失函数的等高线相交处找到解，通常不会产生角点，因此参数不会为 0。
    - **适用场景**：L2 正则化适用于大多数回归和分类问题，尤其是当你希望模型的所有特征都保留但权重较小时。

- **缺点**：
    - 不具有稀疏性（不能直接用于特征选择）。
    - 对特征缩放同样敏感，通常需要对数据进行标准化（例如将特征缩放到均值为 0、方差为 1）。

---

#### 3. **L1 和 L2 的对比**
| 特性             | L1 正则化（Lasso）               | L2 正则化（Ridge）               |
|------------------|-----------------------------------|-----------------------------------|
| 数学形式         | Σ|w_i|                           | Σ(w_i²)                           |
| 参数稀疏性       | 倾向于让某些参数为 0（稀疏）     | 参数不会为 0（平滑）             |
| 特征选择         | 适合（自然进行特征选择）         | 不适合（所有特征权重都会保留）   |
| 稳定性           | 对噪声敏感，解可能不唯一         | 更稳定，解通常唯一               |
| 计算复杂度       | 可能需要专门的优化算法           | 通常更容易优化（二次项）         |

:::code-tabs
@tab ridge.py
``` python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler

matplotlib.use('TkAgg')
# 一些基础参数配置
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12

np.random.seed(42)

m = 100
X = 6 * np.random.rand(m, 1) - 3
y = 0.5 * X ** 2 + X + np.random.randn(m, 1)

from sklearn.linear_model import Ridge

np.random.seed(42)
m = 20
X = 3 * np.random.randn(m, 1)
y = 0.5 * X + np.random.randn(m, 1) / 1.5 + 1
X_new = np.linspace(0, 3, 100).reshape(100, 1)


def plot_model(model_class, poly, alphas, **model_kwargs):
    # 创(Ridge回归模型，传入alpha和其它参数
    for alpha, style in zip(alphas, ('b-', 'g--', 'r:')):
        model = model_class(alpha, **model_kwargs)
        if poly:
            model = Pipeline(
                [('poly_features', PolynomialFeatures(degree=10, include_bias=False)), ('Std', StandardScaler()),
                 ('ridge_regressor', model)])
        model.fit(X, y)
        y_new_predict = model.predict(X_new)
        lw = 2 if alpha > 0 else 1
        plt.plot(X_new, y_new_predict, style, linewidth=lw, label='alpha={}'.format(alpha))

    plt.plot(X, y, 'b.', linewidth=3)
    plt.axis([0, 3, 0, 2.5])
    plt.legend(loc='upper right')

# Ridge
plt.figure(figsize=(10, 5))

plt.subplot(121)
plot_model(Ridge, poly=False, alphas=(0, 10, 100))

plt.subplot(122)
plot_model(Ridge, poly=True, alphas=(0, 10 ** -5, 1))

plt.show()
```

@tab lasso.py
``` python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler

matplotlib.use('TkAgg')
# 一些基础参数配置
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12

np.random.seed(42)

m = 100
X = 6 * np.random.rand(m, 1) - 3
y = 0.5 * X ** 2 + X + np.random.randn(m, 1)

from sklearn.linear_model import Ridge

np.random.seed(42)
m = 20
X = 3 * np.random.randn(m, 1)
y = 0.5 * X + np.random.randn(m, 1) / 1.5 + 1
X_new = np.linspace(0, 3, 100).reshape(100, 1)


def plot_model(model_class, poly, alphas, **model_kwargs):
    # 创(Ridge回归模型，传入alpha和其它参数
    for alpha, style in zip(alphas, ('b-', 'g--', 'r:')):
        model = model_class(alpha, **model_kwargs)
        if poly:
            model = Pipeline(
                [('poly_features', PolynomialFeatures(degree=10, include_bias=False)), ('Std', StandardScaler()),
                 ('ridge_regressor', model)])
        model.fit(X, y)
        y_new_predict = model.predict(X_new)
        lw = 2 if alpha > 0 else 1
        plt.plot(X_new, y_new_predict, style, linewidth=lw, label='alpha={}'.format(alpha))

    plt.plot(X, y, 'b.', linewidth=3)
    plt.axis([0, 3, 0, 2.5])
    plt.legend(loc='upper right')

# Lasso
from sklearn.linear_model import Lasso
plt.figure(figsize=(10,5))

plt.subplot(121)
plot_model(Lasso, poly=False, alphas=(0,0.1,1))

plt.subplot(122)
plot_model(Lasso, poly=True, alphas=(0,10**-1,1))


plt.show()
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

