var gulp = require('gulp'),
    connect = require('gulp-connect'), //配置webserver
    concat = require('gulp-concat'), //合并js
    clean = require('gulp-clean'), //清理无用的文件和文件夹
    fileInclude = require('gulp-file-include'),//合并html
    imagemin = require('gulp-imagemin'), //图片压缩
    pngcrush = require('imagemin-pngcrush'),
    sourceMaps = require('gulp-sourcemaps'); //处理JS时，生成SourceMap
var webServerRoot = 'dist/',
    appName = 'mr-app',
    appJsPath = webServerRoot + 'src/js/',
    appImgPath = webServerRoot + 'src/images/',
    appJsName = appName + '.js',
    appCssPath = webServerRoot + 'src/css/';

gulp.task('default', ['build-dev', 'webserver', 'watch']);
gulp.task('build-dev', ['build-html-dev', 'build-less-dev', 'build-jsApp-dev', 'build-js-dev', 'build-img-dev', 'copy-plug', 'copy-views']);


gulp.task('webserver', ['build-dev'], function () {
    connect.server({
        root: webServerRoot,
        port: 3009,
        debug: true,
        livereload: true
    });
});

//html
gulp.task('build-html-dev', ['clean-html'], function () {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest(webServerRoot))
        .pipe(connect.reload())
});

gulp.task('clean-html', function () {
    return gulp.src([webServerRoot + '*.html'])
        .pipe(clean())
});

//less
gulp.task('build-less-dev', ['clean-css'], function () {
    return gulp.src('src/css/*.css')
        .pipe(sourceMaps.init())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
});

gulp.task('clean-css', function () {
    return gulp.src(webServerRoot + appCssPath + 'style.css')
        .pipe(clean());
});

gulp.task('clean-maps', function () {
    return gulp.src(webServerRoot + 'maps')
        .pipe(clean());
});

//js
gulp.task('build-jsApp-dev', ['clean-js'], function () {
    return gulp.src([
        'src/asset/js/jquery-1.10.2.min.js',
        'src/asset/js/common.js',
    ])
        .pipe(sourceMaps.init())
        .pipe(concat(appJsName))
        .pipe(sourceMaps.write('../maps'))
        .pipe(gulp.dest(appJsPath))
        .pipe(connect.reload())
});

gulp.task('build-js-dev', ['clean-js'], function () {
    return gulp.src('src/js/**/')
    // .pipe(sourceMaps.init())
    // .pipe(concat("js.js"))
    // .pipe(sourceMaps.write('../maps'))
    // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
});

gulp.task('clean-js', function () {
    return gulp.src(webServerRoot + appJsPath + appJsName)
        .pipe(clean());
});

// img
gulp.task('build-img-dev', ['clean-image'], function () {
    gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('dist/images/'))
        .pipe(connect.reload())
});
//img( 压缩图片 )
gulp.task('imgmin', ['clean-image'], function () {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/images/'))
    //.pipe(notify({ message: 'img task ok' }));//缺少gulp-notif,暂不需要
});
gulp.task('clean-image', function () {
    return gulp.src('dist/images/')
        .pipe(clean());
});
//copy-plug
gulp.task('copy-plug', ['clean-plug'], function () {
    gulp.src(['src/plugins/**/*.*'])
        .pipe(gulp.dest('dist/js/plugins'))
        .pipe(connect.reload())
});
gulp.task('clean-plug', function () {
    return gulp.src('dist/js/plug/**/*.*')
        .pipe(clean());
});
//copy-views
gulp.task('copy-views', ['clean-views'], function () {
    gulp.src(['src/views/**/*.*'])
        .pipe(gulp.dest('dist/views'))
        .pipe(connect.reload())
});
gulp.task('clean-views', function () {
    return gulp.src('dist/views/**/*.*')
        .pipe(clean());
});
gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['build-html-dev','copy-views']);
    gulp.watch('src/**/*.css', ['build-less-dev']);
    gulp.watch(['src/**/*.js'], ['build-jsApp-dev', 'build-js-dev']);
    gulp.watch('src/images/**/*.*', ['build-img-dev']);
});