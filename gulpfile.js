// Include Gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// JS Variables
var jsSRC = 'src/js/**/*.js';
var jsBUILD = 'build/js';

// Other Variables
var cssFrom = 'src/css/**/*';
var cssTo = 'build/css';

// Lint Task
gulp.task('lint', function () {
    return gulp.src(jsSRC)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Copy CSS
gulp.task('copy-css', function () {
    return gulp.src(cssFrom)
        .pipe(gulp.dest(cssTo));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(jsSRC)
        .pipe(concat('step.js'))
        .pipe(gulp.dest(jsBUILD))
        .pipe(rename('step.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsBUILD));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(jsSRC, ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'copy-css', 'scripts', 'watch']);