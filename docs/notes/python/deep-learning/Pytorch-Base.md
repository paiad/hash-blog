---
title: Pytorch入门
createTime: 2025/03/14 23:28:53
permalink: /python/cnlb4wvg/
---
### 🌟Anaconda
<CardGrid>
    <LinkCard icon="devicon:anaconda" title="Anaconda" href="https://www.anaconda.com/download/success"/>
</CardGrid>

- [x] Create start menu shortcuts (supported packages only).
- [x] Add Anaconda3 to my PATH environment variable ==(自动添加环境变量)=={.info}
- [x] Register Anaconda3 as my default Python 3.12
  Recommended, Allows other programs, such as VSCode, PyCharm, etc. to 
  automatically detect Anaconda3 as the primary Python 3.12 on the system.

==Conda Command=={.important}

| **命令的意义**        | **命令**                                |
|------------------|---------------------------------------|
| 创建新环境            | `conda create -n env_name python=3.x` |
| 激活环境             | `conda activate env_name`             |
| 显示所有环境信息         | `conda info -e`                       |
| 删除环境 | `conda env remove --name env_name`    |
### 🌟NVIDIA
>[!info]
> - `nvcc -V`返回版本号可以判断是否安装了cuda
> - `nvidia-smi`显示的是当前版本驱动可以支持的最高的cuda版本

在cmd命令行中查看自己的显卡型号和系统信息
```bash
nvidia-smi
```
根据自己的显卡，下载对应的Nvidia驱动程序
<CardGrid>
    <LinkCard icon="lineicons:nvidia" title="Nvidia" href="https://www.nvidia.cn/drivers/lookup/"/>
</CardGrid>

>[!note]
> - ==CPU== 与==集显==：集显是 CPU 的一部分，性能受 CPU 型号和代际影响。新一代 CPU 通常带更强的集显（如 Iris Xe 比 UHD 强）。
> - ==CPU== 与==独显==：CPU 和独显独立工作，互不依赖，但 CPU 的性能会影响整体系统效率（如训练 PyTorch 模型时，CPU 和独显协同处理数据）。
> - ==集显==与==独显==：集显和独显在双显卡设备中互补，集显省电，独显高性能，系统根据负载自动切换。

### 🌟Pytorch
<CardGrid>
    <LinkCard icon="devicon:pytorch" title="Pytorch" href="https://pytorch.org/get-started/locally/"/>
</CardGrid>

根据自己的笔记本型号下载并安装==pytorch=={.note}
<ImageCard image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/pytorch-base-e1.png" />
```bash
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```
如下图所示，出现True，即安装成功
```bash
(pytorch-3.12) C:\Users\USER>python
Python 3.12.9 | packaged by conda-forge | (main, Mar  4 2025, 22:37:18) [MSC v.1943 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.cuda.is_available()
True
```

>[!info]
> ==CUDA==是NVIDIA的并行计算平台，用类C语言通过GPU加速任务，适合大量并行运算，如机器学习等。
> 核心是利用GPU多线程执行“内核”函数。

### 🌟Jupyter
<CardGrid>
    <LinkCard icon="devicon:jupyter" title="Jupyter" href="https://jupyter.org/"/>
</CardGrid>

```bash
jupyter notebook
```

---

### PyTorch加载数据初认识
:::code-tabs
@tab load_datas.py
```python
import os
from torch.utils.data import Dataset

class MyDataset(Dataset):
    def __init__(self, root_dir, label_dir):
        self.root_dir = root_dir
        self.label_dir = label_dir
        # 图片所属文件夹路径
        self.path = os.path.join(root_dir, label_dir)
        # 图片所属文件夹路径的图片名列表枚举
        self.img_path = os.listdir(self.path)
    def __getitem__(self, idx):
        img_name= self.img_path[idx]
        img_item_path = os.path.join(self.path, img_name)
        img = Image.open(img_item_path)
        label = self.label_dir
        return img, label
    
    def __len__(self):
        return len(self.img_path)

# 数据集所在根目录        
root_dir = '../datasets/hymenoptera_data/train'

ants_label_dir = 'ants'
bees_label_dir = 'bees'
ants_dataset = MyDataset(root_dir, ants_label_dir)
bees_dataset = MyDataset(root_dir, bees_label_dir)

img_ant, label_ant = ants_dataset[1]
img_bee, label_bee = bees_dataset[1]

img_ant.show()
img_bee.show()

# 总数据集
train_set = ants_dataset + bees_dataset
len(train_set)
```
:::
### TensorBoard
>[!important]
> `TensorBoard` 是 TensorFlow 提供的可视化工具，主要用于 深度学习模型的训练过程和结果分析

:::code-tabs
@tab TensorBoard.py
```python
from torch.utils.tensorboard import SummaryWriter
writer = SummaryWriter('logs')

for i in range(100):
    writer.add_scalar('y=2x', 2*i, i)

writer.close()
```
:::

### Transforms
>[!important]
> `Transforms` 通常指的是 数据变换，在深度学习和数据处理领域，它主要用于对数据进行预处理，以提高模型的训练效果和泛化能力。
>`torchvision.transforms` 是 PyTorch 提供的 数据增强 和 预处理 工具，主要用于图像数据处理。
> 
:::code-tabs
@tab useful_transforms.py
```python
from PIL import Image
from torch.utils.tensorboard import SummaryWriter
from torchvision import transforms

img = Image.open('./images/blog.jpg').convert('RGB')
print(img)

writer = SummaryWriter('logs')

# ToSensor
trans_totensor = transforms.ToTensor()
img_tensor = trans_totensor(img)
writer.add_image('ToSensor', img_tensor)

# Normalize
# output[channel] = (input[channel] - mean[channel]) / std[channel]
print(img_tensor[0][0][0])
trans_normalize = transforms.Normalize(mean=[0.1, 0.1, 0.2], std=[0.1, 0.1, 0.1])
img_normalize = trans_normalize(img_tensor)
print(img_normalize[0][0][0])
writer.add_image('Normalize', img_normalize)

# Resize
print(img.size)
trans_resize = transforms.Resize((512, 512))
img_resize = trans_resize(img)
print(img_resize)

img_resize = trans_totensor(img_resize)
writer.add_image('Resize', img_resize)

# Compose 用于将多个变换操作组合在一起
transform_compose = transforms.Compose([
    transforms.Resize((512, 512)),  # 调整尺寸
    transforms.ToTensor(),  # 转换为张量
    transforms.Normalize(mean=[0.15, 0.1, 0], std=[0.01, 0.01, 0.01])  # 正则化
])
img_compose = transform_compose(img)
writer.add_image('Compose', img_compose)

# RandomCrop 随即裁剪
transform_rand = transforms.RandomCrop(size=(314, 314))
img_rand = transform_rand(img)
img_rand = trans_totensor(img_rand)
writer.add_image('RandomCrop', img_rand, 10)

writer.close()
```
:::



### torchvision中的数据集的使用
:::code-tabs
@tab torchvision.py
```python
import torchvision
from torch.utils.tensorboard import SummaryWriter

# train_set = torchvision.datasets.CIFAR10(root='./dataset', train=True, download=True)
# test_set = torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True)
#
# print(test_set[0])
# # 打印类别数
# print(test_set.classes)
#
# img, target = test_set[0]
# print(test_set.classes[target])
# img.show()


dataset_transform = torchvision.transforms.Compose([
    torchvision.transforms.ToTensor()
])

train_set = torchvision.datasets.CIFAR10(root='./dataset', train=True, transform=dataset_transform, download=True)
test_set = torchvision.datasets.CIFAR10(root='./dataset', train=False, transform=dataset_transform, download=True)

print(test_set[0])

writer = SummaryWriter('logs')
for i in range(10):
    img, target = test_set[i]
    writer.add_image('test_set', img, i)

writer.close()

```
:::



