"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
exports.saveConfig = saveConfig;
exports.addPlatform = addPlatform;
exports.addTool = addTool;
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const fs = __importStar(require("fs-extra"));
const CONFIG_DIR = path.join(os.homedir(), '.coding-config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
async function loadConfig() {
    try {
        return await fs.readJson(CONFIG_FILE);
    }
    catch {
        return { platforms: {}, tools: {} };
    }
}
async function saveConfig(config) {
    await fs.ensureDir(CONFIG_DIR);
    await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
}
async function addPlatform(platformId, apiKey) {
    const config = await loadConfig();
    config.platforms[platformId] = { apiKey };
    await saveConfig(config);
}
async function addTool(toolId, platformId) {
    const config = await loadConfig();
    config.tools[toolId] = { platform: platformId };
    await saveConfig(config);
}
