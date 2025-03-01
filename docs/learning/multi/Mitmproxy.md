---
title: 🥬Mitmproxy
createTime: 2025/03/01 14:07:27
permalink: /article/bej6r33d/
tags:
  - python
  - mitmproxy
---
> mitmproxy 是一个功能强大的开源代理工具，不仅支持 HTTP 和 HTTPS 流量的拦截与代理，
> 还提供了实时查看、修改请求和响应的能力，非常适合开发者、测试人员和安全研究人员使用。

在反向代理模式下，[mitmproxy](https://docs.mitmproxy.org/stable/concepts-modes/)充当普通服务器。客户端的请求将被转发到预配置的目标服务器，响应将被转发回客户端：
<ImageCard
image="https://docs.mitmproxy.org/stable/schematics/proxy-modes-reverse.png"
/>

### 步骤1：下载mitmproxy
::: code-tabs
@tab pip
```bash
pip install mitmproxy
```
@tab conda
```bash
conda install mitmproxy
```
:::
### 步骤2：编写代码
::: code-tabs
@tab script.py
```python
from mitmproxy import http
import json

# 请求拦截和修改
def request(flow: http.HTTPFlow) -> None:
    """
    在请求到达目标服务器前，拦截并打印请求信息
    """
    target_url = "xxx.yyy.zzz/path"  # 替换为你实际需要爬取的路径
    # 可使用re模块进行匹配
    if target_url in flow.request.pretty_url:     
        print(f"\n=== New Request ===")
        print(f"URL: {flow.request.pretty_url}")
        print(f"Method: {flow.request.method}")
        print(f"Headers: {dict(flow.request.headers)}")

        # 如果有请求体，打印内容
        if flow.request.content:
            try:
                content = flow.request.content.decode('utf-8')
                print(f"Request Content: {content}")
            except:
                print(f"Request Content (raw): {flow.request.content}")

# 响应拦截和修改
def response(flow: http.HTTPFlow) -> None:
    """
    在响应返回给客户端前，拦截并打印响应信息
    Intercept and print response info before it returns to the client
    """
    target_url = "examination.xuetangx.com/exam"
    if target_url in flow.request.pretty_url:
        print(f"\n=== Response ===")
        print(f"URL: {flow.request.pretty_url}")
        print(f"Status Code: {flow.response.status_code}")
        print(f"Headers: {dict(flow.response.headers)}")

        # 尝试解析和打印响应内容
        if flow.response.content:
            try:
                content = flow.response.content.decode('utf-8')
                # 如果不需要保存数据，可将下一行注释
                save_to_file(f"URL: {flow.request.pretty_url}\nContent: {content}")   
                try:
                    json_data = json.loads(content)
                    print("Response JSON Data:")
                    print(json.dumps(json_data, indent=2, ensure_ascii=False))# type: str
                except json.JSONDecodeError:
                    print(f"Response Content: {content[:500]}...")  # 限制长度
            except UnicodeDecodeError:
                print(f"Response Content (raw): {flow.response.content[:500]}...")

# 可选：保存数据到文件
def save_to_file(data, filename="crawling_data.txt"):
    with open(filename, 'a', encoding='utf-8') as f:
        f.write(data + "\n\n")
```
:::

### 步骤3：配置代理端口
>配置主机代理端口为127.0.0.1:8080
> 
> mitmproxy 默认端口 8080。(可根据自身需要修改)

<ImageCard
image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/img/mitmproxy-e1.png"
width = 60%
/>


### 步骤4：运行脚本代码
在代码所属文件夹终端运行以下命令：
:::code-tabs
@tab bash
```bash
mitmdump -s script.py
```
:::

### 步骤5：配置mitmproxy证书

如果你需要处理 HTTPS 流量，你需要为 mitmproxy 安装并信任其根证书。mitmproxy 会为 HTTPS 流量创建一个自签名证书，并使用该证书进行解密。

为浏览器配置mitmproxy证书：
>启动 mitmproxy 后，打开浏览器访问 [http://mitm.it](http://mitm.it)，
> 
>根据页面提示下载并安装证书。

### 步骤6：数据爬取与分析处理
格式转换：txt --> docx
:::code-tabs
@tab bash
```bash
pip install python-docx
```
:::
::: code-tabs
@tab transform.py
```python
from docx import Document

def txt_to_word(input_txt_path, output_docx_path):
    # 创建一个新的 Word 文档
    doc = Document()

    # 读取 .txt 文件内容
    with open(input_txt_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # 将每一行写入 Word 文档
    for line in lines:
        # 去除每行末尾的换行符（因为 add_paragraph 会自动添加换行）
        line = line.strip()
        doc.add_paragraph(line)

    # 保存 Word 文档
    doc.save(output_docx_path)
    print(f"文件已成功转换为 {output_docx_path}")

# 调用
input_txt_path = 'crawling_data.txt'  # 修改为自己的 txt 文件路径
output_docx_path = 'data.docx'  # 修改为自己的 docx 名称，自定义存储路径
txt_to_word(input_txt_path, output_docx_path)
```
:::

...