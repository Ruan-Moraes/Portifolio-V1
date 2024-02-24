const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');

gulp.task('scss', function () {
  return gulp
    .src('assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ['> 0%'] })]))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('assets/css'));
});
