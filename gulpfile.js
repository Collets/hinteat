/* eslint-disable */

const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const concat = require('gulp-concat');

const gprint = require('gulp-print');
const gutil = require("gulp-util");
const del = require('del');
const vinylPaths = require('vinyl-paths');
const webpackStream = require('webpack-stream')
const webpackProdConfig = require('./webpack.prod.js');
const webpackDevConfig = require('./webpack.dev.js');
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const open = require('opn');


const paths = {
  src: './src/',
  build: './dist/'
};

gulp.task('precompile-templates', () =>
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

gulp.task('webpack:build', ['precompile-templates'] ,() => {
  return webpackStream(webpackProdConfig)
      .pipe(gulp.dest(`${paths.build}`));
});

gulp.task('webpack:web.server', () => {
  var myConfig = Object.create(webpackDevConfig);

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
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    open('http://localhost:9000/');
  });
});

gulp.task('default', ['webpack:build']);
gulp.task('webserver', ['webpack:web.server']);