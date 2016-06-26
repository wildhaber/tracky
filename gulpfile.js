require('babel-core/register');

/**
 * Modules
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var header = require('gulp-header');
var rename = require('gulp-rename');
var include = require('gulp-include');
var bump = require('gulp-bump');
var del = require('del');
var pkg = require('./package.json');
var plumber = require('gulp-plumber');
var eslint = require('gulp-eslint');
var eslintConfig = require('./.eslintrc.js');
var jasmine = require('gulp-jasmine');

/**
 * Config
 */
var config = {
    name: 'tracky',
    src: ['src/tracky.js'],
    dest: 'dist/',
    test: {
        dir: 'test/'
    },
    banner: [
        '/*!',
        ' * tracky.js v<%= pkg.version %> - <%= pkg.description %>',
        ' * Author: Copyright (c) <%= pkg.author.name %> <<%= pkg.author.url %>>',
        ' * Url: <%= pkg.homepage %>',
        ' * License: <%= pkg.license %>',
        ' */',
        ''
    ].join('\n')
};

/**
 * Tasks
 */
gulp.task(
    'clean', function (cb) {
        del(['dist'], cb)
    }
);

gulp.task(
    'test:lint', function () {
        return gulp.src(config.src)
            .pipe(plumber())
            .pipe(eslint(eslintConfig))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    }
);

gulp.task(
    'test:jasmine', function (done) {
        gulp.src(config.test.dir + 'jasmine/**/*.spec.js')
            .pipe(
                jasmine(
                    {
                        verbose: true
                    }
                )
            );
    }
);

gulp.task(
    'default', ['clean'], function () {
        gulp.start('compile');
    }
);

gulp.task(
    'watch', function () {
        gulp.watch(config.src, ['compile']);
    }
);