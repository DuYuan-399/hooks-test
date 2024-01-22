const commonConfig = require('../../gulpfile');
const gulp = require('gulp');
const fs = require('fs');
const fse = require('fs-extra');
const fg = require('fast-glob'); // 遍历读取所有文件
const gm = require('gray-matter');

function generateDesc(mdPath) {
  if (!fs.existsSync(mdPath)) return;
  const mdFile = fs.readFileSync(mdPath, 'utf8');
  const { content } = gm(mdFile);
  let description =
    (content.replace(/\r\n/g, '\n').match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || '';
  description = description.trim();
  description = description.charAt(0).toLowerCase() + description.slice(1);

  return description;
}
// 获取文档 /hook/src/**/index.md
async function generateMetaData() {
  const metaData = {
    function: [],
  };
  const hooks = fg
    .sync('src/use*', {
      onlyDirectories: true,
    })
    .map((item) => item.replace('src/', ''));

  await Promise.allSettled(
    hooks.map(async (hook) => {
      const decription = await generateDesc(`src/${hook}/index.md`);
      return {
        name: hook,
        decription,
      };
    }),
  ).then((res) => {
    metaData.function = res.map((item) => {
      if (item.status === 'fulfilled') {
        return item.value;
      }
      return null;
    });
  });

  return metaData;
}

gulp.task('metadata', async function () {
  const metaData = await generateMetaData();
  await fse.writeJson('metaData.json', metaData, { spaces: 2 });
});
exports.default = gulp.series(commonConfig.default, 'metadata');
