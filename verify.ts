import { PLATFORMS } from './src/platforms';
import { TOOLS } from './src/tools';

console.log('=== coding-config 项目验证 ===\n');

console.log('1. 平台适配器验证：');
Object.keys(PLATFORMS).forEach(platformId => {
  const platform = PLATFORMS[platformId];
  console.log(`  - ${platform.name} (${platform.id}):`);
  console.log(`    API Key URL: ${platform.apiKeyUrl}`);
  console.log(`    Base URL: ${platform.baseUrl}`);
  console.log(`    Default Model: ${platform.defaultModel}`);
  console.log(`    Compatible Tools: ${platform.getCompatibleTools().join(', ')}`);
});

console.log('\n2. 工具适配器验证：');
Object.keys(TOOLS).forEach(toolId => {
  const tool = TOOLS[toolId];
  console.log(`  - ${tool.name} (${tool.id}):`);
  console.log(`    Config Path: ${tool.configPath()}`);
});

console.log('\n3. 平台与工具兼容性验证：');
Object.keys(PLATFORMS).forEach(platformId => {
  const platform = PLATFORMS[platformId];
  console.log(`  - ${platform.name}:`);
  platform.getCompatibleTools().forEach(toolId => {
    const tool = TOOLS[toolId];
    console.log(`    ✓ 支持 ${tool.name}`);
  });
});

console.log('\n=== 验证完成 ===');