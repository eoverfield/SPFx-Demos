const gulp = require('gulp');

gulp.task('Hello', function() {
    console.log('Welcome');
});
 
gulp.task('SPFx', function() {
    console.log('to the new SharePoint Framework');
});
 
gulp.task('HelloSPFx', ['Hello', 'SPFx'], function() {
    console.log('Have fun using it!!!');
});
