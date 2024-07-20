const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const concat = require("gulp-concat");
const surge = require("gulp-surge");
const browserSync = require("browser-sync").create();

const buildCSS = () => {
  console.log("SASS Compile");

  return src("app/sass/*.scss")
    .pipe(concat("style.min.css"))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(dest("build/css"))
    .pipe(browserSync.stream());
};

const buildHTML = () => {
  console.log("PUG Compile");

  return src("app/pages/*.pug")
    .pipe(pug())
    .pipe(dest("build/"))
    .pipe(browserSync.stream());
};

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: "build/",
    },
  });
  watch(["app/sass/**.scss"], buildCSS);
  watch(["app/pages/**.pug"], buildHTML);
  watch(["build/*.html"]).on("change", browserSync.reload);
};

const buildSurge = () => {
  return surge({
    project: "./build",
    domain: "https://hexlet-chat-project-from-Stepan-Korshukov.surge.sh",
  });
};

exports.default = series(buildCSS, buildHTML, watcher);
exports.surge = buildSurge;
