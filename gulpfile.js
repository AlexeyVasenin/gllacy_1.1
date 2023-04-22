'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const del = require('del');
const { src, dest, watch, series, parallel } = require('gulp');

// MIN & CONV LESS TO CSS
const style = (done) => {
  src('less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 2 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({
        sort: false
      })
    ]))
    .pipe(dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
  done();
}

// MIN IMAGES
const images = (done) => {
  return src('img/**/*.{jpg, png, gif}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true })
    ]))
    .pipe(dest('build/img'));
  done();
};

// MIN JS
const minjs = (done) => {
  src('js/*.js')
    .pipe(dest('build/js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
  done();
};

const html = (done) => {
  src('*.html')
    .pipe(dest('build'));
  done();
};

const dbase = (done) => {
  src('db.json')
    .pipe(dest('build'))
    .pipe(browserSync.stream());
  done();
}
// CLEAN FILES
const clean = () => {
  return del('build');
};

// COPY FILES
const copy = (done) => {
  return src([
    'css/*.css',
    'fonts/**/*.{woff,woff2}',
    'img/**',
    'js/**',
    'jslib/**',
    '*.html',
    'db.json'
  ], {
    base: '.'
  })
    .pipe(dest('build'));
  done();
};

// SERVER
const serverWatch = () => {
  browserSync.init({
    server: {
      baseDir: 'build',
      open: true,
    },
  });

  watch('less/**/*.less', style);
  watch('js/**/*.js', minjs);
  watch('*.html', html).on('change', browserSync.reload);
  watch('db.json', dbase);
};

exports.default = series(clean, copy, style, images, minjs, serverWatch);