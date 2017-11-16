//inspired by https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#gulp
var gulp = require("gulp");
var ts = require("gulp-typescript");

//var browserSync = require('browser-sync').create();

gulp.task("default", function () {
    var tsResult = gulp.src("src/strings.ts")
        .pipe(ts({
              noImplicitAny: true,
              out: "output.js"
        }));

    /*
    gulp.src(['src/*.html'])
        .pipe(gulp.dest("dist"));

    browserSync.init({
        notify: false,
        server: {
            baseDir: ['dist'],
            index: "index.html"
        },
        https: false
    });
    */

    return tsResult.js.pipe(gulp.dest("dist"));
});