<https://bailian.console.aliyun.com/cn-beijing/?tab=doc#/doc/?type=model&url=3023078>

创建并打开配置文件~/.claude/settings.json。

~ 代表用户主目录。如果 .claude 目录不存在，需要先行创建。可在终端执行 mkdir -p ~/.claude 来创建。

nano ~/.claude/settings.json
编辑配置文件。将 YOUR_API_KEY 替换为 Coding Plan 专属 API Key。

{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "YOUR_API_KEY",
        "ANTHROPIC_BASE_URL": "<https://coding.dashscope.aliyuncs.com/apps/anthropic>",
        "ANTHROPIC_MODEL": "qwen3.5-plus"
    }
}
保存配置文件，重新打开一个终端即可生效。

编辑或新增 ~/.claude.json 文件，将hasCompletedOnboarding 字段的值设置为 true并保存文件。

{
  "hasCompletedOnboarding": true
}
hasCompletedOnboarding 作为顶层字段，请勿嵌套于其他字段。
该步骤可避免启动Claude Code时报错：Unable to connect to Anthropic services。
