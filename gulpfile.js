const { src, dest, series, watch } = require('gulp');
const imagemin	= require('gulp-imagemin');
const rename    = require('gulp-rename');
const uglify    = require('gulp-uglify-es').default;
const less      = require('gulp-less');
const cleanCSS 	= require('gulp-clean-css');
const concat 	= require('gulp-concat');
const del 		= require('del');

/**
 **** 4 BASIC GULP Methods ****
 * gulp.task    - Define tasks                      	// Task is being deprecated in favour of 'exports.' using the series() and parallel() methods
 * gulp.src     - Point to files to use 
 * gulp.dest    - Points to folder to output
 * gulp.watch   - Watch files and folder for changes 
 */

// Delete the dist, audio and img directories and index page so we always have a clean builds.
function clean(cb) {
	return del(['public/dist',
				'public/audio',
				'public/img',
				'public/index*'
				], cb);
}

// Load any JS and CSS files required from any dependencies
function nodeModuleFilesToCopy(cb) {
   
	src('node_modules/@fortawesome/fontawesome-free/js/all.min.js')
	.pipe(rename('fontawesome.min.js'))
    .pipe(dest('public/dist/assets/js'));
	
	src('node_modules/jquery/dist/jquery.min.js')
	.pipe(dest('public/dist/assets/js'));
	
	src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(dest('public/dist/assets/webfonts'))
   
	src('node_modules/@fortawesome/fontawesome-free/css/all.min.css')
	.pipe(rename('fontawesome.min.css'))
    .pipe(dest('public/dist/assets/css'));
	cb();
}

// Copy files to dist folder
function copyIndex(cb) {
	src('src/index*')
    .pipe(dest('public/'));
    cb();    
}

// Copy Audio files to dist folder
function copyAudio(cb) {
	src('src/audio/*')
	.pipe(rename('waterfall.mp3'))
    .pipe(dest('public/audio/'));    
    cb();
}

// Minifys images to dist folder
function imageMin(cb) {
    src('src/img/*')
    .pipe(imagemin())
    .pipe(dest('public/img/'))
    cb();
}

// Minifys all JS files and concat into 1 js file
function jsMin(cb) {
	src('src/js/*')
	.pipe(concat('all.min.js'))
    .pipe(uglify(/* options */))
    .pipe(dest('public/dist/assets/js'));
    cb();
}

// Compiles all LESS files and concat into 1 css file
function lessCompileAndMin(cb) {
	src('src/less/*.less')
	.pipe(concat('all.min.css'))
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(dest('public/dist/assets/css'));
    cb();
}

exports.build = series( clean,
						nodeModuleFilesToCopy,
						copyIndex,
						copyAudio,
						imageMin,
						jsMin,
						lessCompileAndMin
                    );

exports.watch = function() {
	// Two watch tasks setup looking at less & js files respectively 
	watch('src/less/*.less', lessCompileAndMin);
	watch('src/js/*.js', minifyJS);
};