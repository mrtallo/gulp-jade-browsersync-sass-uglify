//Settings

var environment ='./build/';
    build_loc   = './build';


var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    prefix      = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    plumber     = require('gulp-plumber');


// Static Server + watching scss/html files
gulp.task('serve', ['sass','templates','compress'], function() {

    browserSync.init({
        server: environment
    });

  
    gulp.watch("js/**/*.js", ['js-watch']);
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("./build/**/*.html").on('change', browserSync.reload);
    gulp.watch('./jade/**/!(_)*.jade',['jade-watch']);
});

// Compile sass into CSS & auto-inject into browsers .on('error', sass.logError)
gulp.task('sass', function() {
    return gulp.src("scss/**/*.scss")
        .pipe(sass({outputStyle : 'compressed'}).on('error', sass.logError))
        .pipe(prefix("last 15 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest(build_loc))
        .pipe(browserSync.stream());
});

gulp.task('templates', function() {
  return gulp.src('./jade/**/!(_)*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(build_loc));
});

gulp.task('compress', function() {
  return gulp.src('js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(build_loc));
});


gulp.task('js-watch', ['compress'], browserSync.reload);


gulp.task('jade-watch', ['templates'],browserSync.reload);


gulp.task('default', ['serve']);