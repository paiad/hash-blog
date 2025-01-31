---
title: 🐋本地部署大模型
createTime: 2025/01/31 00:17:58
permalink: /article/pjrtphxj/
aside: left
---
在Windows中部署属大语言模型: [Ollama + open-webui + deepseek-r1](https://blog.csdn.net/qq_29371275/article/details/145368168)
- Ollama：是一款开源的聊天机器人框架，主要目标是简化大型语言模型（LLMs）的部署和运行流程，支持多种语言模型，如 Llama 2、Code Llama、Mistral 和 Gemma 等，可让用户在本地机器或私有服务器上轻松运行这些模型，无需依赖云服务，具有简化部署、跨平台支持、自定义和扩展性等特点。
- Open WebUI：是一个可扩展、功能丰富、用户友好的自托管 WebUI。旨在与大型语言模型进行交互，特别是那些由 Ollama 或与 OpenAI API 兼容的服务所支持的模型。它为用户提供了一个直观的界面来与语言模型进行交互，支持全 markdown 和 latex，能增强 LLM 体验的互动功能，还支持本地和远程的检索增强生成（RAG）集成等。
- ==Ollama== 负责模型的部署和运行，==Open WebUI== 负责提供交互界面和其他辅助功能
### Steps
::: steps
1. 下载并安装Ollama
2. pip/conda下载Open WebUI
3. 在终端执行命令open-webui serve
4. 访问localhost:8080
:::

### Ollama

>Github: [Ollama](https://github.com/ollama/ollama)
> 
>Download: [OllamaSetup.exe](https://ollama.com/download)

### Open WebUI
> Github: [Open WebUI](https://github.com/open-webui/open-webui) 

::: code-tabs
@tab official
```sh
# 创建虚拟环境，执行以下命令
pip install open-webui
```

@tab alibaba
``` sh
pip install -i https://mirrors.aliyun.com/pypi/simple/ open-webui
```

@tab tsinghua
``` sh
pip install -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple open-webui
```
:::