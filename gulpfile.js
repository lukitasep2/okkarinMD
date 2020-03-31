const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync').create();

gulp.task('sass', ()=>
    gulp.src('./dev/scss/*.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true
        }))
        .pipe(autoprefixer({
            versions: ['last 2 browsers']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browsersync.stream())

);
gulp.task('pug', ()=>
    gulp.src('./dev/pug/pages/*.pug')
    .pipe(pug({
        pretty: true,
        sourceComments: true
    }))
    .pipe(gulp.dest('./dist/'))    
);

gulp.task('default', () => {
    gulp.watch('./dev/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./dev/pug/**/*.pug', gulp.series('pug'))
    gulp.watch('dist/**/*.html').on('change', browsersync.reload)
    browsersync.init({
        server: {
            baseDir: './dist'
        }
    })
});

