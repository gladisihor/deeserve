'use strict';

// required modules
var gulp = require('gulp'),
    git = require('gulp-git'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    scss = require('gulp-sass'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    imagemin = require('gulp-imagemin'),
    cssbeautify = require('gulp-cssbeautify'),
    gcmq = require('gulp-group-css-media-queries'), // gruop media queries in css
    jsprettify = require('gulp-js-prettify'),
    cleanCSS = require('gulp-clean-css'), // minify css
    uglify = require('gulp-uglify'), // minify js
    pump = require('pump'), // additional to minify js
    fileinclude = require('gulp-file-include'), // html includes
    connect = require('gulp-connect'), // additional to livereload
    clean = require('gulp-clean'), // removes files and folders
    gulpCopy = require('gulp-copy'), // copy files from one folder to another
    notify = require("gulp-notify");

// functional variables 
var localhostId = '3030';
var distLocalhostId = '3031'; // port for the DIST folder. Might be equal to SRC port
var mainCss = 'all.css';
var mainJQuery = 'jquery.main.js';
var mainPureJs = 'main.js';
var fontName = 'iconfont';

// project structure
var path = {
    remoteMarkup: 'https://github.com/gladisihor/markup.git',
    root: './',
    distFolder: './dist/',
    distFolderCont: './dist/*',
    cssDist: './dist/site/css/',
    jsDist: './dist/site/js/',
    mainJsDist: './dist/site/js/bundle.js',
    imagesDist: './dist/site/images/',
    svgFontDist: './dist/site/fonts/',

    srcFolder: './src',
    htmlIncludes: './src/includes/*.html',
    scss: './src/site/scss/',
    css: './src/site/css/',
    js: './src/site/js/',
    imagesInput: './src/site/images/**/*.*',
    imagesOutput: './src/site/images/',

    svgFontInput: './src/site/sourceicons/*.svg',
    svgFontOutput: './src/site/fonts/',
    svgFontTemplate: './src/site/sourceicons/template/_icons.css',
    svgFontScssOutput: '../scss/base/_icons.scss',
    svgFontCssPath: '../fonts/',

    watch: {
        srcHtml: './src/*.html',
        distHtml: './dist/*.html',
        fonts: './src/site/fonts/*.*',
        html: './src/**/*.html',
        htmlIncludes: './src/includes/**/*.html',
        js: './src/site/js/**/*.js',
        jsAll: './src/site/js/**/*.*',
        jsDist: './dist/site/js/**/*.js',
        jsDistAll: './dist/site/js/**/*.*',
        scssToCss: './src/site/scss/**/*.scss',
        css: './src/site/css/**/*.css',
        img: './src/site/sourceimages/**/*.*',
        svgFonts: './src/site/sourceicons/**/*.*'
    }
};

// modules' API
var prefApi = {
    browsers: ['last 2 versions', '> 1%',  'ie 10'],
    cascade: false
};
var connectApi = {
    root: path.srcFolder,
    port: localhostId,
    livereload: true
};
var connectDistApi = {
    root: path.distFolder,
    port: distLocalhostId,
    livereload: true
};
var prettifyApi = {
    indent: '   '
};
var fileincludeApi = {
    prefix: '@@',
    basepath: '@file'
};
var iconfontApi = function() {
    return {
        fontName: fontName,
        path: path.svgFontTemplate,
        targetPath: path.svgFontScssOutput,
        fontPath: path.svgFontCssPath,
        cssClass: 'icon'
    };
};
var iconGeneratorApi = {
    fontName: fontName,
    height: 100,
    normalize: true,
    centerHorizontally: true,
    formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
};

/* git */
// src is the root folder for git to initialize 
gulp.task('git:init', function(){
    git.init(function (err) {
        if (err) throw err;
    });
});
// clone a remote markup template with all features
gulp.task('deploy', ['git:init'], function(){
    git.clone(path.remoteMarkup, function (err) {
        if (err) throw err;
    });
});

/* localhost src connect */
gulp.task('connect', function() {
    connect.server(connectApi);
    gulp.src('.')
        .pipe(notify('Localhost port (SRC): ' + localhostId));
});

/* localhost dist connect */
gulp.task('connect:dist', function() {
    connect.server(connectDistApi);
    gulp.src('.')
        .pipe(notify('Localhost port (DIST): ' + distLocalhostId));
});

/* scss */
gulp.task('scss', function () {
    return gulp.src(path.watch.scssToCss)
        .pipe(sourcemaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer(prefApi))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.css))
        .pipe(connect.reload());
});

/* html */
gulp.task('html', function () {
    gulp.src(path.watch.html)
        .pipe(connect.reload());
});

// html includes
gulp.task('fileinclude', function() {
    gulp.src([path.htmlIncludes])
        .pipe(fileinclude(fileincludeApi))
        .pipe(gulp.dest(path.srcFolder));
});

/* icon fonts */
gulp.task('iconfont', function(){
    gulp.src([path.svgFontInput])
        .pipe(iconfontCss(iconfontApi()))
        .pipe(iconfont(iconGeneratorApi))
        .pipe(gulp.dest(path.svgFontOutput));
});

/* optimize images */
gulp.task('optimize', function () {
    return gulp.src(path.imagesInput)
        .pipe(imagemin())
        .pipe(gulp.dest(path.imagesDist));
});

/* prettify css */
gulp.task('prettify:css', function () {
    return gulp.src(path.watch.css)
        .pipe(gcmq())
        .pipe(cssbeautify(prettifyApi))
        .pipe(gulp.dest(path.cssDist));
});
gulp.task('prettify:srccss', function () {
    return gulp.src(path.watch.css)
        .pipe(gcmq())
        .pipe(cssbeautify(prettifyApi))
        .pipe(gulp.dest(path.css));
});

/* minify css */
gulp.task('minify:css', function () {
    return gulp.src(path.watch.css)
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.cssDist));
});

/* prettify js */
gulp.task('prettify:js', ['copy:js'], function() {
    return gulp.src(path.jsDist + mainJQuery)
        .pipe(jsprettify())
        .pipe(gulp.dest(path.jsDist));
});

gulp.task('prettify:srcjs', function() {
    gulp.src(path.js + mainJQuery)
        .pipe(jsprettify())
        .pipe(gulp.dest(path.js));
});

/* minify js */
gulp.task('minify:js', ['copy:js'], function() {
    return gulp.src(path.jsDist + mainJQuery)
        .pipe(uglify())
        .pipe(gulp.dest(path.jsDist));
});

/* clean folders */
// clean all dist
gulp.task('clean', function () {
    return gulp.src(path.distFolder, {
        read: false,
        force: true
    }).pipe(clean());
});
// clean css
gulp.task('clean:css', function () {
    return gulp.src(path.cssDist, {
        read: false,
        force: true
    }).pipe(clean());
});
// clean js
gulp.task('clean:js', function () {
    return gulp.src(path.jsDist, {
        read: false,
        force: true
    }).pipe(clean());
});
// clean images
gulp.task('clean:images', function () {
    return gulp.src(path.imagesDist, {
        read: false,
        force: true
    }).pipe(clean());
});
// clean fonts
gulp.task('clean:fonts', function () {
    return gulp.src(path.svgFontDist, {
        read: false,
        force: true
    }).pipe(clean());
});
gulp.task('clean:nodes', function () {
    return gulp.src('./node_modules', {
        read: false,
        force: true
    }).pipe(clean());
});

/* inits */
gulp.task('copy:html', function () {
    return gulp
        .src(path.watch.srcHtml)
        .pipe(gulpCopy(path.distFolder, {
            prefix: 1
        }));
});
gulp.task('copy:fonts', function () {
    return gulp
        .src(path.watch.fonts)
        .pipe(gulpCopy(path.svgFontDist, {
            prefix: 3
        }));
});
gulp.task('copy:js', function () {
    return gulp
        .src(path.watch.js)
        .pipe(gulpCopy(path.jsDist, {
            prefix: 3
        }));
});

/* watchers */
gulp.task('watch', ['scss'], function() {
    gulp.watch(path.watch.scssToCss, ['scss']);
    gulp.watch(path.watch.html, ['html']);
});
gulp.task('watch:includes', ['fileinclude'], function() {
    gulp.watch(path.watch.htmlIncludes, ['fileinclude']);
});
gulp.task('watch:icons', ['iconfont'], function() {
    gulp.watch(path.watch.htmlIncludes, ['iconfont']);
});

gulp.task('l', ['connect', 'watch']);
gulp.task('l:inc', ['connect', 'watch', 'watch:includes']);
gulp.task('l:incscss', ['connect', 'watch', 'watch:includes']);
gulp.task('l:icons', ['connect', 'watch', 'watch:icons']);
gulp.task('l:incicons', ['connect', 'watch', 'watch:includes', 'watch:icons']);

gulp.task('default', ['l:inc']);

// groups
gulp.task('copy', ['copy:html', 'copy:fonts']);
gulp.task('prettify', ['prettify:js', 'prettify:css']);
gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('dist', ['copy', 'prettify', 'optimize']);
gulp.task('dist:min', ['copy', 'minify', 'optimize']);
