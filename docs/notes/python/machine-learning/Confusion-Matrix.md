---
title: 混淆矩阵
createTime: 2025/02/04 20:05:27
permalink: /python/lp5810au/
---

>混淆矩阵（Confusion Matrix）是评估分类模型性能的工具，展示了预测结果与实际结果的对比。它通常用于二分类问题，但也可扩展到多分类。

### 混淆矩阵的结构

一个二分类问题的混淆矩阵如下：
- T：代表你是预测成功还是失败
- P/N：代表预测的是正例还是负例

|                     | 实际为正例 | 实际为负例 |
|---------------------|------------|------------|
| **预测为正例**      | TP (真正例) | FP (假正例) |
| **预测为负例**      | FN (假负例) | TN (真负例) |

- **TP (True Positive)**: 实际为正例，预测为正例。
- **FP (False Positive)**: 实际为负例，预测为正例。
- **FN (False Negative)**: 实际为正例，预测为负例。
- **TN (True Negative)**: 实际为负例，预测为负例。

### 示例

假设有一个二分类模型，用于预测患者是否患有某种疾病。以下是模型的预测结果：

- 实际患病人数：100
- 实际健康人数：200
- 模型预测患病人数：90（其中80人正确预测，10人错误预测）
- 模型预测健康人数：210（其中190人正确预测，20人错误预测）

对应的混淆矩阵如下：

|                     | 实际患病 | 实际健康 |
|---------------------|----------|----------|
| **预测患病**        | 80 (TP)  | 10 (FP)  |
| **预测健康**        | 20 (FN)  | 190 (TN) |

### 常用指标

基于混淆矩阵，可以计算以下指标：

- **准确率 (Accuracy)**: (TP + TN) / (TP + FP + FN + TN)
- **精确率 (Precision)**: TP / (TP + FP)
- **召回率 (Recall)**: TP / (TP + FN)
- **F1分数 (F1 Score)**: 

$$ \frac{2 \cdot Precision \cdot Recall}{Precision + Recall}$$

>[!tip]
> 精确率: 预测正确的正例的样本数 / 预测的正例的样本数
> 
> 召回率: 预测正确的正例的样本数 / 实际的正例的样本数

### 阈值
>在分类模型中，阈值（Threshold） 是一个用于将模型输出的置信度（或概率）转换为最终分类决策的关键参数。
> 它决定了模型对某一类别的判定标准。

<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/confusion_matrix-1.png"
width = 90%
center = true
/>

分类模型对于每一个样本点都会输出一个置信度。通过设置置信度阈值，就可以完成分类。设置的阈值越低，召回率（Recall）会越高，精确率（Precision）会越小；反之，相反。
### PR曲线
> PR曲线就是以精确度为纵坐标，以召回率为横坐标绘制出的曲线。
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/PR-curve.png"
width = 50%
/>

### ROC曲线
>ROC 曲线（Receiver Operating Characteristic Curve）是一种用于评估分类模型性能的工具，特别是在二分类问题中。
> 它通过绘制真正率（True Positive Rate, TPR） 和假正率（False Positive Rate, FPR） 的关系来展示模型在不同阈值下的表现。
<ImageCard
image="https://cdn.jsdelivr.net/gh/Pai3141/PictureBed@main/ml/ROC-curve.png"
width = 50%
/>

1. 真正率（TPR，True Positive Rate）
- 也称为**召回率（Recall）** 或**灵敏度（Sensitivity）**。

表示模型正确识别正类样本的能力：
$$ TPR = \frac{TP}{TP + FN} $$
- **TP（True Positive）**：被正确预测为正类的样本数。
- **FN（False Negative）**：被错误预测为负类的正类样本数。

2. 假正率（FPR，False Positive Rate）

表示模型错误地将负类样本预测为正类的比例： 
$$ FPR = \frac{FP}{FP + TN} $$
- **FP（False Positive）**：被错误预测为正类的负类样本数。
- **TN（True Negative）**：被正确预测为负类的样本数。

3. 阈值的作用
- ROC 曲线通过调整分类模型的阈值，计算不同阈值下的 TPR 和 FPR，并将它们绘制成曲线。

#### AUC
AUC 是 ROC 曲线下方的面积，用于量化模型的整体性能。
AUC 的取值范围是 [0, 1]：
- AUC = 1 ：完美分类器。
- AUC = 0.5 ：随机猜测分类器。
- AUC < 0.5 ：模型表现比随机猜测还差（通常说明模型有问题）。