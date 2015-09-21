var gulp = require('gulp');
// load plugins
var $ = require('gulp-load-plugins')();
var plumber = require('gulp-plumber');

var css_files = 'src/public/sass/**/*.scss',
    js_files = 'src/public/scripts/**/*',
    fonts_files = 'src/public/fonts/**/*',
    image_files = 'src/public/img/**/*',
    template_files = 'src/templates/**/*',
    chaplin_files = ['src/chaplin_config.json', 'src/app.yml'];

gulp.task('default', ['build'],  function(){});

gulp.task('css', function () {
  return gulp.src(css_files)
  .pipe(plumber())
  .pipe($.rubySass({
      style: 'expanded',
      precision: 10
  }))
  .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe($.concat('main.css'))
  .pipe(gulp.dest('dist/public/css'))
  livereload.listen();
});

gulp.task('js', function () {
  return gulp.src(js_files)
  .pipe(plumber())
  .pipe(gulp.dest('dist/public/js'))
  $.livereload.listen();
})

gulp.task('fonts', function () {
  return gulp.src(fonts_files)
  .pipe(gulp.dest('dist/public/fonts'))
  $.livereload.listen();
})

gulp.task('images', function () {
  return gulp.src(image_files)
  .pipe(gulp.dest('dist/public/img'))
  $.livereload.listen();
})

gulp.task('templates', function () {
  return gulp.src(template_files)
  .pipe(gulp.dest('dist/templates'))
  $.livereload.listen();
});

gulp.task('chaplin', function () {
  return gulp.src(chaplin_files)
  .pipe(gulp.dest('dist'))
  $.livereload.listen();
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(connect.static('app'))
    .use(connect.static('.tmp'))
    .use(connect.directory('app'));

    require('http').createServer(app)
    .listen(9292)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9292');
    });
});

gulp.task('serve', ['connect', 'css'], function () {
    require('opn')('http://localhost:9292');
});

gulp.task('watch', ['connect', 'serve'], function () {
  $.livereload.listen();
 
  gulp.watch([
    'src/*.html',
    'src/public/sass/**/*.scss',
    'src/public/js/**/*.js',
    'src/public/img/**/*'
  ]).on('change', function (file) {
    return $.livereload.changed(file.path);
  });

  gulp.watch('src/public/sass/**/*.scss', ['css']);
  gulp.watch(js_files, ['js']);
  gulp.watch(image_files, ['images']);
  gulp.watch(template_files, ['templates']);
  gulp.watch(chaplin_files, ['chaplin']);
});


gulp.task('build', function () {
  return gulp.start('chaplin', 'templates', 'js', 'css', 'images');
})