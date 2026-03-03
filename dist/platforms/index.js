"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORMS = exports.VolcenginePlatform = exports.AliPlatform = exports.ZhipuPlatform = void 0;
// 导出所有平台
var zhipu_1 = require("./zhipu");
Object.defineProperty(exports, "ZhipuPlatform", { enumerable: true, get: function () { return zhipu_1.ZhipuPlatform; } });
var ali_1 = require("./ali");
Object.defineProperty(exports, "AliPlatform", { enumerable: true, get: function () { return ali_1.AliPlatform; } });
var volcengine_1 = require("./volcengine");
Object.defineProperty(exports, "VolcenginePlatform", { enumerable: true, get: function () { return volcengine_1.VolcenginePlatform; } });
// 平台注册表
exports.PLATFORMS = {
    zhipu: new (require('./zhipu').ZhipuPlatform)(),
    ali: new (require('./ali').AliPlatform)(),
    volcengine: new (require('./volcengine').VolcenginePlatform)(),
};
