---
title: 交叉验证
createTime: 2025/02/02 23:53:45
permalink: /python/a09c3bgv/
---
### 交叉验证
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/cross-validation.jpg"
width = 95%
center = true
/>

### K折交叉验证
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/k-folds.jpg"
width = 95%
center = true
/>

### 代码示例
::: code-tabs
@tab cross_validation.py
```python
import numpy as np
import os
import matplotlib
import matplotlib.pyplot as plt

# 一些基础参数配置
matplotlib.use('TkAgg')
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12
import warnings
warnings.filterwarnings("ignore")
np.random.seed(42)

from sklearn.datasets import fetch_openml

# https://scikit-learn.org/stable/modules/generated/sklearn.datasets.fetch_openml.html
mnist = fetch_openml('mnist_784', version=1) # 通过 name/dataset-id 从OpenML官网下载数据集

# X：一个包含 784 个特征的矩阵
# y：一个标签向量，表示每个图像的数字标签（0 到 9）。
X, y = mnist["data"], mnist["target"]

# 取前60000个为训练集，后60000~70000为测试集
X_train, X_test, y_train, y_test = X[:60000], X[60000:], y[:60000], y[60000:]

# 洗牌操作
import numpy as np
shuffle_index = np.random.permutation(len(X_train))
X_train, y_train = X_train.iloc[shuffle_index], y_train.iloc[shuffle_index]

y_train_5 = (y_train == "5")
y_test_5 = (y_test == "5")

from sklearn.linear_model import SGDClassifier
sdg_clf = SGDClassifier(max_iter=5, random_state=42) # 创建一个随机梯度下降算法 训练的分类器
sdg_clf.fit(X_train, y_train_5) # 拟合数据

sdg_clf.predict([X.loc[35000]]) # 根据标签定位 X 的元素

# https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_val_score.html
from sklearn.model_selection import cross_val_score
"""
sdg_clf：它是一个分类器，用于进行训练和预测。

cv=3：指定交叉验证的折数（folds）

scoring='accuracy'：指定评估指标，这里使用的是 accuracy，即准确率，来衡量模型的预测性能。
"""
cross_val_score(sdg_clf, X_train, y_train_5, cv=3, scoring='accuracy')

from sklearn.model_selection import StratifiedKFold
from sklearn.base import clone

"""
较为复杂，灵活性高
"""
skfolds = StratifiedKFold(n_splits=3, random_state=42, shuffle=True)

for train_index, test_index in skfolds.split(X_train, y_train_5):
    clone_clf = clone(sdg_clf)
    X_train_folds = X_train.iloc[train_index]
    y_train_folds = y_train_5.iloc[train_index]
    X_test_folds = X_train.iloc[test_index]
    y_test_folds = y_train_5.iloc[test_index]

    clone_clf.fit(X_train_folds, y_train_folds)
    y_pred = clone_clf.predict(X_test_folds)
    n_correct = sum(y_pred == y_test_folds)

    print(n_correct / len(y_pred))
```
:::
<Icon name = "devicon:jupyter"/>cross_validation.ipynb
[//]: # ([//]: # &#40;@[demo]&#40;./code/evaluate_method.html&#41;&#41; =>)
@[codepen preview tab="result" height="550px"](Pai3141/mybgZbb)