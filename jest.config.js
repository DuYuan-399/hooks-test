/*
 * @Author: duyuanyuan 418999164@qq.com
 * @Date: 2024-01-21 18:16:46
 * @LastEditors: duyuanyuan 418999164@qq.com
 * @LastEditTime: 2024-01-21 19:52:27
 * @FilePath: \encode-hooks-myself\jest.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // 指定Jest 使用的预设（preset），即使用 ts-jest 来处理 JavaScript 和 TypeScript 文件的转换和编译
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom', // 指定测试环境为 jsdom,即运行环境为Node
  clearMocks: true, // 每次运行测试前自动清除模拟函数的状态
  testPathIgnorePatterns: ['/.history/'], // 忽略该测试路径
  modulePathIgnorePatterns: ['<rootDir>/package.json'], // 忽略匹配package.json
  resetMocks: false, // 实现在多个测试文件中共享模拟函数的状态
  setupFiles: ['./jest.setup.js', 'jest-localstorage-mock'], // 在运行测试之前执行的脚本文件，可以用于设置全局的测试环境
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // 在运行测试之后执行的脚本文件，用于扩展 Jest 的断言能力
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }], // ts入口--使用ts-jest进行ts转换，并根据tsconfig进行编译
  },
  // 收集项目根目录下所有 src 目录及子目录下的 JavaScript 和 TypeScript 文件，但排除 demo、example、es、lib 和 dist 目录下的文件
  collectCoverageFrom: [
    '<rootDir>/**/src/**/*.{js,jsx,ts,tsx}',
    '!**/demo/**',
    '!**/example/**',
    '!**/es/**',
    '!**/lib/**',
    '!**/dist/**',
  ],
  transformIgnorePatterns: ['^.+\\.js$'], // 忽略所有s.js 文件的转换
};
