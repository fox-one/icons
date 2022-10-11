const { dest, series, src } = require("gulp");
const path = require("path");
const replace = require("gulp-replace-path");
const babel = require("gulp-babel");
const vue = require("@omni-door/gulp-plugin-vue-sfc");

const srcDir = path.resolve(__dirname, "./src/icons");
const destDir = path.resolve(__dirname, "./lib");

function compileSFC() {
  const sfc = [`${srcDir}/**/*.vue`, `!${srcDir}/**/*.stories.vue`];

  return src(sfc)
    .pipe(vue.default({ ext: ".ts" }))
    .pipe(babel({ root: "../" }))
    .pipe(replace(/\.vue("|'){1}/g, ".js$1"))
    .pipe(dest(destDir));
}

exports.default = series(compileSFC);
