---
title: Pytorch入门
createTime: 2025/03/14 23:28:53
permalink: /python/cnlb4wvg/
---
### Anaconda Install
<CardGrid>
    <LinkCard icon="devicon:anaconda" title="Anaconda" href="https://www.anaconda.com/download/success"/>
</CardGrid>

- [x] Create start menu shortcuts (supported packages only).
- [x] Add Anaconda3 to my PATH environment variable ==(自动添加环境变量)=={.important}
- [x] Register Anaconda3 as my default Python 3.12
  Recommended, Allows other programs, such as VSCode, PyCharm, etc. to 
  automatically detect Anaconda3 as the primary Python 3.12 on the system.

### Conda Command
| **命令的意义**        | **命令**                                |
|------------------|---------------------------------------|
| 创建新环境            | `conda create -n env_name python=3.x` |
| 激活环境             | `conda activate env_name`             |
| 显示所有环境信息         | `conda info -e`                       |
| 删除环境 | `conda env remove --name env_name`    |
### Nvidia
在cmd命令行查看自己的显卡型号和系统信息
```bash
nvida-smi
```
根据自己的显卡，下载对应的Nvidia驱动程序
<CardGrid>
    <LinkCard icon="lineicons:nvidia" title="Nvidia" href="https://www.nvidia.cn/drivers/lookup/"/>
</CardGrid>

### Pytorch
<CardGrid>
    <LinkCard icon="devicon:pytorch" title="Pytorch" href="https://pytorch.org/get-started/locally/"/>
</CardGrid>

根据自己的电脑情况下载pytorch
```bash
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
```
如下图所示，出现True，即是安装成功
```bash
(pytorch-3.12) C:\Users\USER>python
Python 3.12.9 | packaged by conda-forge | (main, Mar  4 2025, 22:37:18) [MSC v.1943 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.cuda.is_available()
True
```