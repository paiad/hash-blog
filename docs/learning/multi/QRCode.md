---
title: 🌻自定义二维码
createTime: 2025/01/15 18:43:16
tags:
  - QRCode
cover:
  url: ../image/hash_qrcode.png
  layout: right
  ratio: 1.0
  width: 150
excerpt:
  本文介绍了使用Python生成自定义二维码的代码示例，包括如何嵌入URL并在二维码中心添加logo。通过调整二维码的参数，如错误校正级别、尺寸等，生成带有自定义图像的二维码，并保存显示生成的图片。 
permalink: /article/dncjusfd/
#sticky: 3141592
---
>[!tip]
> 使用代码生成自定义的二维码需要注意以下两点：
> 1. 第5行: 需要将你的需要生成的二位码对应的连接换为你自己的：https://xxx.xxx.xxx
> 2. 第37行: 若你需要在二维码中添加图片请将下方的Hash.png换为你自己已存在的图片路径
> 3. 其他关于二维码的自定义细节，请自己调整代码实现
> 4. EH二维码:   [https://paiad.online](https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/hash_qrcode.png)
> 5. CN二维码:   [https://paiad.top](https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/hash_qrcode_cn.png)



generated_qrcode.py:
```python
import qrcode
from PIL import Image

# 创建二维码
data = "https://paiad.online"  # 你想在二维码中包含的链接
qr = qrcode.QRCode(
    version=1, 
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # 高错误校正等级
    box_size=10, 
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

# 获取二维码的矩阵
matrix = qr.get_matrix()

# 创建一个新的图像，填充背景色(白色)
qr_width = len(matrix) * 10
qr_height = len(matrix) * 10
qr_image = Image.new("RGB", (qr_width, qr_height), color="white")

# 获取绘制二维码的对象
pixels = qr_image.load()

# 遍历二维码矩阵并填充颜色
for row in range(len(matrix)):
    for col in range(len(matrix[row])):
        if matrix[row][col]:
            color = (0, 0, 0)
        else:
            color = (255, 255, 255)
        for i in range(10):
            for j in range(10):
                pixels[col * 10 + i, row * 10 + j] = color

logo = Image.open("Hash.png")  # 替换为你的图片路径
logo = logo.convert("RGBA")

qr_width, qr_height = qr_image.size
logo_size = int(qr_width / 5)
logo = logo.resize((logo_size, logo_size))

logo_position = ((qr_width - logo_size) // 2, (qr_height - logo_size) // 2)

# 将 logo 放置到二维码的中心
qr_image.paste(logo, logo_position, mask=logo.split()[3])

# 保存最终的二维码图片
qr_image.save("generated_qrcode.png")

# 展示生成的二维码
qr_image.show()

```