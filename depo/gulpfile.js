var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var del = require('del');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');


// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false
    // tunnel: true,
    // tunnel: "basovich" //Demonstration page: http://basovich.localtunnel.me
  });
});

// Минификация пользовательских скриптов проекта и JS библиотек в один файл
gulp.task('js', function () {
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/slick/slick.js',
    'app/js/common.js'
  ])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(uglify()) // Минимизировать весь js (на выбор)
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/*компилируем scss*/
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on("error", notify.onError()))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(rename({
      suffix: '.min',
      prefix: ''
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/*Слежка за файлами*/
gulp.task('watch', ['sass', 'js', 'html', 'browser-sync'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/img/**/*', ['images']);
});

// Images
gulp.task('images', function() {
  return gulp.src('app/img/**/*')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('build/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Font
gulp.task('font', function() {
  return gulp.src('app/font/**/*')
    .pipe(gulp.dest('build/font'))
    .pipe(notify({ message: 'Images task complete' }));
});


/*Удаление папки с собраным проектом*/
gulp.task('clean', function(){
  return del.sync('build');
});


/*таски для сборки проекта*/
gulp.task('build', ['clean', 'images', 'font']);

gulp.task('default', ['build', 'watch']);