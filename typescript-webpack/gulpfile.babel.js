// generated on 2016-09-10 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import webpack from 'webpack2-stream-watch';

const $ = gulpLoadPlugins();

gulp.task('Typescript', function () {
	var tsProject = $.typescript.createProject('tsconfig.json');

	return gulp.src("./app/typescript/*.ts")
		.pipe($.sourcemaps.init())
		.pipe(tsProject())
		.pipe($.sourcemaps.write("."))
		.pipe(gulp.dest("./lib"));
})


gulp.task('Webpack', ['Typescript'], function () {
	return gulp.src('./lib/siteData.ts')
	   .pipe(webpack(require('./webpack.config.js')))
	   //.pipe($.copy('./solution/templates/SiteAssets'))
	   .pipe(gulp.dest('./dist'))
	   .pipe(gulp.dest('./solution/templates/SiteAssets'));
})

gulp.task('serve', ['Webpack'], function () {
	browserSync({
		notify: false,
		ui: false,
		open:false,
		server: {
			baseDir: ['app'],
			routes: {
			'/SiteAssets': './solution/templates/SiteAssets'
			}
		},
		https: true
	});

	gulp.watch('app/typescript/*.ts', ['Webpack']);
})