---
title: 梯度下降
createTime: 2025/02/01 12:38:04
permalink: /python/2moeut57/
#aside: false
---
### 步骤分析
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

### 简单梯度下降代码示例
::: code-tabs
@tab gradient_descent.py
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

X_b = np.c_[np.ones((100, 1)), X]  # 加入偏置项
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

X_new = np.array([[0], [2]])
X_new_b = np.c_[np.ones((2, 1)), X_new]

eta = 0.1  # 学习率
n_iter = 1000  # 迭代次数
m = 100  # 总样本数
theta = np.random.randn(2, 1)
for iter in range(n_iter):
    gradients = 2 / m * X_b.T.dot(X_b.dot(theta) - y)
    theta = theta - eta * gradients # 梯度的反方向

print("通过梯度下降算法计算的权重：\n", theta)
print("通过梯度下降算法预测的数据(x=2 和 x=9)：\n", X_new_b.dot(theta))
```
:::

### 三种不同的梯度下降策略
:::code-tabs

@tab BGD(批量梯度下降).py
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

X_b = np.c_[np.ones((100, 1)), X]  # 加入偏置项
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

X_new = np.array([[0], [2]])
X_new_b = np.c_[np.ones((2, 1)), X_new]

eta = 0.1  # 学习率
n_iter = 1000  # 迭代次数
m = 100  # 总样本数
theta = np.random.randn(2, 1)
for iter in range(n_iter):
    gradients = 2 / m * X_b.T.dot(X_b.dot(theta) - y)
    theta = theta - eta * gradients # 梯度的反方向
    
theta_path_bdg = []

def plot_gradient_descent(theta, eta, theta_path=None):
    m = len(X_b)
    plt.plot(X, y, 'b.')
    n_iter = 1000
    for iter in range(n_iter):
        y_predict = X_new_b.dot(theta)
        plt.plot(X_new, y_predict, 'b-')
        gradients = 2 / m * X_b.T.dot(X_b.dot(theta) - y)
        theta = theta - eta * gradients
        if theta_path is not None:
            theta_path.append(theta)
    plt.xlabel('X_1')
    plt.axis([0, 2, 0, 15])
    plt.title("eta = {}".format(eta))

theta = np.random.randn(2, 1)

# 针对不同的学习率，绘制不同的图像
plt.figure(figsize=(10, 4))
plt.subplot(131)
plot_gradient_descent(theta, eta=0.02)

plt.subplot(132)
plot_gradient_descent(theta, eta=0.1, theta_path=theta_path_bdg)

plt.subplot(133)
plot_gradient_descent(theta, eta=0.5)

plt.show()
```

@tab SGD(随机梯度下降).py
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

X_b = np.c_[np.ones((100, 1)), X]  # 加入偏置项
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

X_new = np.array([[0], [2]])
X_new_b = np.c_[np.ones((2, 1)), X_new]

eta = 0.1  # 学习率
n_iter = 1000  # 迭代次数
m = 100  # 总样本数
theta = np.random.randn(2, 1)
for iter in range(n_iter):
    gradients = 2 / m * X_b.T.dot(X_b.dot(theta) - y)
    theta = theta - eta * gradients # 梯度的反方向
    
theta_path_bdg = []

def plot_gradient_descent(theta, eta, theta_path=None):
    m = len(X_b)
    plt.plot(X, y, 'b.')
    n_iter = 1000
    for iter in range(n_iter):
        y_predict = X_new_b.dot(theta)
        plt.plot(X_new, y_predict, 'b-')
        gradients = 2 / m * X_b.T.dot(X_b.dot(theta) - y)
        theta = theta - eta * gradients
        if theta_path is not None:
            theta_path.append(theta)
    plt.xlabel('X_1')
    plt.axis([0, 2, 0, 15])
    plt.title("eta = {}".format(eta))

theta_path_sdg = []
m = len(X_b)
n_epochs = 50

t0 = 5
t1 = 50

theta = np.random.randn(2, 1)


# 是学习率递减，后面越学越细
def learn_schedule(t):
    return t0 / (t + t1)


for epoch in range(n_epochs):
    for i in range(m):
        if epoch == 0 and i < 20:
            y_predict = X_new_b.dot(theta)
            plt.plot(X_new, y_predict, 'r-')
        random_index = np.random.randint(m)
        xi = X_b[random_index:random_index + 1]
        yi = y[random_index:random_index + 1]
        gradients = 2 * xi.T.dot(xi.dot(theta) - yi)
        eta = learn_schedule(epoch * m + i)
        theta = theta - eta * gradients
        theta_path_sdg.append(theta)
plt.plot(X, y, 'b.')
plt.axis([0, 2, 0, 15])
plt.show()
```

@tab MBGD(随机梯度下降).py
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

X_b = np.c_[np.ones((100, 1)), X]  # 加入偏置项
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

X_new = np.array([[0], [2]])
X_new_b = np.c_[np.ones((2, 1)), X_new]

eta = 0.1  # 学习率
n_iter = 1000  # 迭代次数
m = 100  # 总样本数
theta = np.random.randn(2, 1)
for iter in range(n_iter):
    gradients = 2 / m * X_b.T.dot(X_b.dot(theta) - y)
    theta = theta - eta * gradients  # 梯度的反方向

theta_path_bdg = []


def plot_gradient_descent(theta, eta, theta_path=None):
    m = len(X_b)
    plt.plot(X, y, 'b.')
    n_iter = 1000
    for iter in range(n_iter):
        y_predict = X_new_b.dot(theta)
        plt.plot(X_new, y_predict, 'b-')
        gradients = 2 / m * X_b.T.dot(X_b.dot(theta) - y)
        theta = theta - eta * gradients
        if theta_path is not None:
            theta_path.append(theta)
    plt.xlabel('X_1')
    plt.axis([0, 2, 0, 15])
    plt.title("eta = {}".format(eta))

t0 = 5
t1 = 50
def learn_schedule(t):
    return t0 / (t + t1)

theta_path_mbdg = []
n_epochs = 50
minibatch = 16

t = 0
for epoch in range(n_epochs):
    shuffled_indices = np.random.permutation(m)
    X_b_shuffled = X_b[shuffled_indices]
    y_shuffled = y[shuffled_indices]
    for i in range(0, m, minibatch):
        y_predict = X_new_b.dot(theta)
        plt.plot(X_new, y_predict, 'r-')
        t = t + 1
        xi = X_b_shuffled[i:i + minibatch]
        yi = y_shuffled[i:i + minibatch]
        gradients = 2 / minibatch * xi.T.dot(xi.dot(theta) - yi)
        eta = learn_schedule(t)
        theta = theta - eta * gradients
        theta_path_mbdg.append(theta)
plt.plot(X, y, 'b.')
plt.axis([0, 2, 0, 15])
plt.show()
```
:::