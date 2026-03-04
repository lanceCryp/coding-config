Codex 是由 OpenAI 推出的智能编程代理，本文介绍如何在 Codex 中配置与使用阿里云百炼 Coding Plan。

接入Codex需要修改配置文件~/.codex/config.toml 中的模型提供商、模型和base_url等，下面在 Codex 中配置 Coding Plan章节提供了具体配置信息。

安装 Codex
安装或更新 Node.js（v18.0 或更高版本）。

在终端中执行以下命令安装 Codex。请安装支持 Chat/Completions API 的旧版本 Codex，如 0.80.0 版本。

npm install -g @openai/codex@0.80.0
在终端中执行以下命令，若输出版本号，则表示安装成功。

codex --version
在 Codex 中配置 Coding Plan
修改配置文件

完整复制以下内容并粘贴到 Codex 配置文件~/.codex/config.toml中。model请选择支持的模型。

说明
Codex 最新版本不再支持 Chat/Completions API。如需使用 Coding Plan，请参考上文安装 Codex安装旧版本 Codex。

model_provider = "Model_Studio_Coding_Plan"
model = "qwen3.5-plus"
[model_providers.Model_Studio_Coding_Plan]
name = "Model_Studio_Coding_Plan"
base_url = "<https://coding.dashscope.aliyuncs.com/v1>"
env_key = "OPENAI_API_KEY"
wire_api = "chat"
