var gulp = require('gulp');
// load plugins
var $ = require('gulp-load-plugins')();
var plumber = require('gulp-plumber');

var config = {

  src: {
    css: 'src/public/sass/**/*.scss',
    js: 'src/public/scripts/**/*',
    fonts: 'src/public/fonts/**/*',
    image: 'src/public/img/**/*',
    template: 'src/templates/**/*',
    chaplin: ['src/chaplin_config.json', 'src/app.yml']
  },

  dist: {
    css: 'dist/public/css',
    js: 'dist/public/js/',
    fonts: 'dist/public/fonts/',
    image: 'dist/public/img',
    template: 'dist/templates/',
    chaplin: 'dist/'
  }
}

gulp.task('default', ['build'],  function(){});

gulp.task('css', function () {
  return gulp.src(config.src.css)
  .pipe(plumber())
  .pipe($.rubySass({
      style: 'expanded',
      precision: 10
  }))
  .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe($.concat('main.css'))
  .pipe(gulp.dest(config.dist.css))
  .pipe($.livereload())
});

gulp.task('js', function () {
  return gulp.src(config.src.js)
  .pipe(plumber())
  .pipe(gulp.dest(config.dist.js))
  $.livereload.listen();
})

gulp.task('fonts', function () {
  return gulp.src(config.src.fonts)
  .pipe(gulp.dest('dist/public/fonts'))
  $.livereload.listen();
})

gulp.task('images', function () {
  return gulp.src(config.src.image)
  .pipe(gulp.dest(config.dist.image))
  $.livereload.listen();
})

gulp.task('templates', function () {
  return gulp.src(config.src.template)
  .pipe(gulp.dest(config.dist.template))
  $.livereload.listen();
});

gulp.task('chaplin', function () {
  return gulp.src(config.src.chaplin)
  .pipe(gulp.dest(config.dist.chaplin))
  $.livereload.listen();
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
    .use(require('connect-livereload')({ port: 9292 }))
    .use(connect.static('app'))
    .use(connect.static('.tmp'))
    .use(connect.directory('app'));

    require('http').createServer(app)
    .listen(3000)
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
    config.src.css,
    config.src.js,
    config.src.image
  ]).on('change', function (file) {
    return $.livereload.changed(file.path);
    console.log('changed')
  });

  gulp.watch(config.src.css, ['css']);
  gulp.watch(config.src.js, ['js']);
  gulp.watch(config.src.image, ['images']);
  gulp.watch(config.src.template, ['templates']);
  gulp.watch(config.src.chaplin, ['chaplin']);
});


gulp.task('build', function () {
  return gulp.start('chaplin', 'templates', 'js', 'css', 'images', 'fonts');
})
