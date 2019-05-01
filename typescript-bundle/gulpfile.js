//inspired by https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#gulp
var gulp = require("gulp");
var ts = require("gulp-typescript");

var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

var browserSync = require('browser-sync').create();

gulp.task("default", function () {

    //var tsProject = ts.createProject('tsconfig.json', {module: "System"});
    var tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest("dist"));



    /*
    //for browserify to work, need to provide files direct, tsify will load and use rest of tscongif.json though
    var tsBrowserify = browserify({
        basedir: '.',
        debug: true,
        entries: ["src/OurWebpart.ts"],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('output.js'))
    .pipe(gulp.dest("dist"));

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

    
});