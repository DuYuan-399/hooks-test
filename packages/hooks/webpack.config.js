// 实现cdn代码产出 umd
const merge = require('webpack-merge');
const common = require('../../webpack.common');
const path = require('path');

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'encodeHooks.js', // 打包文件的名称
    library: 'encodeHooks', // 打包生成的模块的导出变量名
    path: path.resolve(__dirname, './dist'), // 打包文件生成的路径
  },
});
