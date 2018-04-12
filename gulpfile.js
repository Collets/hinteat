/* eslint-disable */

const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const concat = require('gulp-concat');

const gprint = require('gulp-print');
const gutil = require("gulp-util");
const del = require('del');
const vinylPaths = require('vinyl-paths');
const open = require('opn');

const webpack = require("webpack");
const webpackStream = require('webpack-stream');
const WebpackDevServer = require("webpack-dev-server");

/* CONFIG FILES */
const BUILD_DEV_CONFIG = require('./webpack.build.dev.js');
const BUILD_PROD_CONFIG = require('./webpack.build.prod.js');
const SERVE_DEV_CONFIG = require('./webpack.serve.dev.js');


const paths = {
  src: './src/',
  build: './dist/'
};

gulp.task('nunjucks:precompile', () =>
	gulp.src('src/app/**/*.+(njk)')
    .pipe(nunjucks.precompile({
      name: file => { 
        var path = file.relative;
        return (`${path.substr(path.lastIndexOf('/') + 1)}`);
      }
    }))
    .pipe(concat('templates.js'))
		.pipe(gulp.dest('src/lib'))
);

gulp.task('webpack:serve:dev', ['nunjucks:precompile'], () => {
  var myConfig = Object.create(SERVE_DEV_CONFIG);

  new WebpackDevServer(webpack(myConfig), {
    port: 9000,
    disableHostCheck: true,
    host: 'localhost',
    historyApiFallback: true,
    open: true,
    hot: true,
    stats: {
      colors: true
    },
  }).listen(9000, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);

    open(process.env.BASEURL);
  });
});

gulp.task('webpack:build:prod', ['nunjucks:precompile'] ,() => {
  return webpackStream(BUILD_PROD_CONFIG)
      .pipe(gulp.dest(`${paths.build}`));
});

gulp.task('webpack:build:dev', ['nunjucks:precompile'] ,() => {
  return webpackStream(BUILD_DEV_CONFIG)
      .pipe(gulp.dest(`${paths.build}`));
});