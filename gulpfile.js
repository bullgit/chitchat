var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

var css_files = 'src/public/scss/app.scss',
    js_files = ['bower_components/foundation/js/foundation.min.js',
                 'bower_components/modernizr/modernizr.js',
                 'bower_components/jquery/dist/jquery.min.js'],
    image_files = 'src/public/images/**/*',
    template_files = 'src/templates/**/*',
    chaplin_files = ['src/chaplin_config.json', 'src/app.yml']


gulp.task('css', function () {
    return gulp.src(css_files)
        .pipe(sass({
          loadPath: "bower_components/foundation/scss",
        }))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('dist/public/css'));
});

gulp.task('js', function () {
  return gulp.src(js_files)
        .pipe(gulp.dest('dist/public/js'));
})

gulp.task('images', function () {
  return gulp.src(image_files)
        .pipe(gulp.dest('dist/public/images'));
})

gulp.task('templates', function () {
  return gulp.src(template_files)
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('chaplin', function () {
  return gulp.src(chaplin_files)
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/public/scss/*', ['css']);
  gulp.watch(js_files, ['js']);
  gulp.watch(image_files, ['images']);
  gulp.watch(template_files, ['templates']);
  gulp.watch(chaplin_files, ['chaplin']);
});


gulp.task('build', function () {
  return gulp.start('chaplin', 'templates', 'js', 'css', 'images');
})
