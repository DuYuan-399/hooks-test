const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

// 实现clean
gulp.task('clean', async function () {
  await del('dist');
  await del('es');
  await del('lib');
});

// 实现esm 即ts -> js (ESNext) -> es5 (babel js compiler)
gulp.task('esm', function () {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    module: 'ESNext',
  });
  return tsProject.src().pipe(tsProject()).pipe(babel()).pipe(gulp.dest('es/'));
});

// 实现 esm -> cjs
gulp.task('cjs', async function () {
  return gulp
    .src(['./es/**/*.js'])
    .pipe(babel({ configFile: '../../.babelrc' }))
    .pipe(gulp.dest('lib/'));
});

// 实现类型声明
gulp.task('declaration', function () {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true,
    emitDeclarationOnly: true, // 只导出最终的产物
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});

// 实现readme文件复制
gulp.task('copyReadme', async function () {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});

exports.default = gulp.series('clean', 'esm', 'cjs', 'declaration', 'copyReadme');
