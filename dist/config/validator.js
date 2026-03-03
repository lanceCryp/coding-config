"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiKey = validateApiKey;
function validateApiKey(apiKey, platform) {
    if (!apiKey || apiKey.length < 10) {
        return false;
    }
    // 智谱 GLM API Key 格式: xxx.yyy
    if (platform === 'zhipu') {
        return apiKey.includes('.');
    }
    // 阿里云百炼 API Key 格式: sk-xxxxx
    if (platform === 'ali') {
        return apiKey.startsWith('sk-');
    }
    // 火山引擎方舟 API Key 格式: 不特定格式，长度检查即可
    if (platform === 'volcengine') {
        return apiKey.length >= 20;
    }
    return true;
}
