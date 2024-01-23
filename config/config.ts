import { menus } from './hooks';

// const packages = require('../packages/hooks/package.json');

export default {
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  publicPath: '/hooks-test/',
  history: { type: 'hash' },
  // 使用babel插件进行按需加载
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@alifd/next',
        style: false,
      },
      'fusion',
    ],
  ],
  mode: 'site',
  title: 'encode react hooks',
  favicon: '/hooks-test/avatar.png',
  logo: '/hooks-test/avatar.png',
  dynamicImport: {},
  manifest: {},
  hash: true,
  // 设置模块的别名，简化模块引入的路径 如 import { useToggle } from 'encodeHooks'
  // process.cwd()--用于获取当前工作目录的路径。
  alias: {
    encodeHooks: process.cwd() + '/packages/hooks/src/index.ts',
  },
  // 解析模块时要搜索的目录
  resolve: {
    includes: ['docs', 'packages/hooks/src'],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  // 头部导航栏内容
  navs: [
    { title: '指南', path: '/guide' },
    { title: 'Hooks', path: '/hooks' },
  ],
  // 对应navs的path，一个path对应一个页面
  // 每个path都在resolve中指定的文件夹下搜索
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/guide': [
      {
        title: '介绍',
        path: '/guide',
      },
    ],
    '/hooks': menus,
  },
};
