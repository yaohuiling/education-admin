var gulp = require('gulp');
browserSync = require('browser-sync').create();
    reload = browserSync.reload;//实时重载
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
//源码路径
var srcPath = {
    html: 'src/views/**/*.html',
    js: 'src/js/**/*.*',
    images:"src/images/**"
}
var distPath = {
    html: 'dist/',
    js: 'dist/js/',
    images:"dist/images/"
}

//fileinclude任务
gulp.task('fileInclude', function () {
    return gulp.src([srcPath.html,'!./src/views/inc/*'])
        .pipe(plugins.fileInclude())
        .pipe(plugins.changed('dist'))
        .pipe(plugins.clean())
        .pipe(gulp.dest(distPath.html))
})
//js任务
gulp.task('scripts', function () {
    return gulp.src(srcPath.js)
        .pipe(plugins.changed(distPath.js))
        //.pipe(plugins.clean())
        //提示任务完成
        .pipe(gulp.dest(distPath.js))
})
//images任务
gulp.task('images', function () {
    return gulp.src(srcPath.images)
        .pipe(plugins.changed(distPath.images))
       // .pipe(plugins.clean())
        //提示任务完成
        .pipe(gulp.dest(distPath.images))
})
// 静态服务器
gulp.task('server', ['scripts', 'fileInclude'], function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
     gulp.watch(srcPath.html).on('change', reload);
     gulp.watch(srcPath.js).on('change', reload);
    gulp.watch(srcPath.images).on('change', reload);
});

gulp.task('watch', function () {
    //监听fileinclude任务
    gulp.watch(srcPath.html, ['fileInclude']);
    //监听scriptts任务
    gulp.watch(srcPath.js,["scripts"]);
    gulp.watch(srcPath.images,["images"]);
})
gulp.task('default', ['fileInclude', 'scripts','images', 'server', 'watch']);