const gulp = require('gulp');
const ico = require('gulp-to-ico');

gulp.task('ico', () =>
  gulp
    .src('./images/*.png')
    .pipe(ico())
    .pipe(gulp.dest('./dist/'))
);
