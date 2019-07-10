var gulp = require("gulp"),
  sass = require("gulp-sass"),
  notify = require("gulp-notify"),
  livereload = require("gulp-livereload"),
  concat = require("gulp-concat"),
  gulpSequence = require("gulp-sequence"),
  uglifycss = require("gulp-uglifycss"),
  uglifyjs = require("gulp-uglifyjs"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create();

var path = "assets/";

gulp.task("serve", function() {
  browserSync.init({
    server: "./"
  });
});

gulp.task("styles", function() {
  return gulp
    .src("assets/sass/style.scss")
    .pipe(sass({ style: "expanded" }).on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "safari 5",
        "ie 8",
        "ie 9",
        "opera 12.1",
        "ios 6",
        "android 4"
      )
    )
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
  //.pipe(notify({ message: 'Styles task complete' }));
});
gulp.task("styles2", function() {
  return gulp
    .src("assets/sass/blog.scss")
    .pipe(sass({ style: "expanded" }).on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "safari 5",
        "ie 8",
        "ie 9",
        "opera 12.1",
        "ios 6",
        "android 4"
      )
    )
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
  //.pipe(notify({ message: 'Styles task complete' }));
});

// Concatenate & Minify JS
gulp.task("scripts", function() {
  gulp
    .src(["assets/js/*.js", "!assets/js/js.min.js", "!assets/js/jquery.min.js"])
    .pipe(concat("js.min.js"))
    .pipe(
      uglifyjs().on("error", function(e) {
        console.log(e);
      })
    )
    .pipe(gulp.dest("assets/js/"))
    .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task("html", function() {
  return gulp.src("*.html").pipe(browserSync.stream());
});

// Watch
gulp.task("watch", function() {
  // Watch .scss files
  gulp.watch("assets/sass/**/*.scss", ["styles", "styles2"]);

  // Watch .js files
  gulp.watch("assets/js/js.js", ["scripts"]);

  // Watch .html files
  gulp.watch("*.html", ["html"]);
});

gulp.task("default", [
  "serve",
  "html",
  "styles",
  "styles2",
  "scripts",
  "watch"
]);
