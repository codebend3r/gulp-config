'use strict';

/**
 * @author Chester Rivas
 * @description a default scaffolding for dynamically including gulp tasks and a default config object which is used to reference paths
 */

var gulp = require('gulp-help')(require('gulp')),
  gutil = require('gulp-util'),
  plugins = require('gulp-load-plugins')(),
  _ = require('underscore'),
  config = {};

config.coverage = 'coverage';
config.jsdoc = 'jsdoc';
config.buildFolder = 'builds';
config.app = 'app';
config.jsPath = config.app + '/js';
config.scssPath = config.app + '/scss';
config.cssPath = config.app + '/css';
config.viewsPath = config.app + '/views';
config.jsonPath = config.app + '/resource';
config.imgPath = config.app + '/images';
config.fontsPath = config.app + '/fonts';
config.bowerPath = config.app + '/bower_components';
config.browserifyPath = config.app + '/browserify';
config.gulpDir = './gulp-tasks/';

/**
 * @description dynamically requires a gulp task
 * @param task
 * @type {function}
 * @returns {gulp}
 */
config.getTask = function (task) {
  return require(config.gulpDir + task)(gulp, plugins, config, gutil);
};

/**
 * @description registers externalGulpTasks, and loops through external gulp names (config.externalGulpTasks)
 * @type {function}
 */
config.registerGulpTasks = function (tasks) {

  if (!_.isUndefined(tasks)) {
    config.externalGulpTasks = config.externalGulpTasks.concat(tasks);
  } else {
    config.externalGulpTasks = tasks;
  }

  _.each(config.externalGulpTasks, function (task) {
    // defines a new task in a loop
    if (task.dependencies && task.dependencies.length > 0) {
      gulp.task(task.name, task.description, task.dependencies, config.getTask(task.name));
    } else {
      gulp.task(task.name, task.description, config.getTask(task.name));
    }
  });

};

config.dist = 'dist';
config.port = 8008;
config.externalGulpTasks = [];

// export
module.exports = config;
