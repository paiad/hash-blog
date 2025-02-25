---
title: 🤖最小二乘法和梯度下降算法
createTime: 2025/02/03 20:26:14
permalink: /article/njsg11zd/
#aside: false
tags:
   - Machine Learning
---
### 算法理解
一般的，通过最小二乘法和或梯度下降算法可以计算出线性回归的损失函数模型的最优参数。
损失函数：$$J(w,b)=\frac{1}{m}\sum_{i=1}^m(y_i-(w^Tx_i+b))^2$$

就其二本质，笔者给出了自己的理解，如下所示：
1. [最小二乘法](/python/cdvav9jp/)的本质就是
   - 对$w$，$b$求偏导，即$\frac{\partial J(w,b)}{\partial w}=\frac{\partial J(w,b)}{\partial b}=0$
   - 求解有n个未知数的n元一次线性方程
   - 最后求得n个解，将他们一一对应于$w$，$b$

2. [梯度下降算法](/python/2moeut57/)的本质就是
   - 初始化一组参数($w$，$b$)
   - 对$w$，$b$求偏导，即$\frac{\partial J(w,b)}{\partial w}=\frac{\partial J(w,b)}{\partial b}$
   - 更新$w$，$b$参数，即$w\leftarrow w-\alpha\nabla_wJ(w,b)$，$b\leftarrow b-\alpha\nabla_bJ(w,b)$
   >$\|\nabla J(w)\|=\sqrt{\sum\limits_{i=1}^n\left(\frac{\partial J(w,b)}{\partial w_i}\right)^2+(\frac{\partial J(w,b)}{\partial b})^2}$
   - $\|\nabla J(w,b)\|<\epsilon$，梯度模长小于一定阈值，迭代结束

>[!important]
> 最小二乘法： 令各参数偏导为零，求解参数
> 
> 梯度下降算法：初始化所有参数，根据梯度优化参数，迭代，达到结束条件，停止迭代

### [梯度下降的三种方式](http://paiad.online/python/2moeut57/#%E4%B8%89%E7%A7%8D%E4%B8%8D%E5%90%8C%E7%9A%84%E6%A2%AF%E5%BA%A6%E4%B8%8B%E9%99%8D%E7%AD%96%E7%95%A5)
根据每次更新参数时使用的数据量不同，梯度下降可以分为以下三种方式：

样本数据: $x_i$
- 批量梯度下降 (BGD):每次使用所有的样本数据作为权重的参数
- 随机梯度下降 (SGD)：每次仅使用一个样本作为权重的参数
- 小批量梯度下降 (MBGD):每次使用一个小范围的样本作为权重的参数，批量大小（batch size）一般为 32、64、128 等。

| 方法                | 数据量       | 更新频率 | 收敛稳定性 | 计算效率 | 适用场景           |
|---------------------|--------------|----------|------------|----------|--------------------|
| 批量梯度下降 (BGD)   | 全部数据     | 低       | 高         | 低       | 小规模数据集       |
| 随机梯度下降 (SGD)   | 单个样本     | 高       | 低         | 高       | 大规模数据集       |
| 小批量梯度下降 (MBGD) | 小批量数据   | 中       | 中         | 中       | 大规模数据集（常用）|