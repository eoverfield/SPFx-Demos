//inspired by: https://www.typescriptlang.org/docs/handbook/gulp.html
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var watchify = require("watchify");
var gutil = require("gulp-util");
var browserSync = require('browser-sync').create();
var paths = {
    pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/strings.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/strings.ts',
    	'src/interface-class.ts',
    	'src/functions.ts',
    	'src/OurWebpart.ts',
    	'src/namespacing.ts'
    ],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

var bundle = function () {
    return watchedBrowserify
    	.transform('babelify', {
	        presets: ['es2015'],
	        extensions: ['.ts']
	    })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
};

gulp.task("default", ["copy-html"], function() {
	bundle();

	browserSync.init({
        notify: false,
		server: {
	        baseDir: ['dist'],
	        index: "index.html"
	    },
		https: false
    });
});

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);