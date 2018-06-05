var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task("copy-views",function () {
    gulp.src("src/views/**/*.*")
})