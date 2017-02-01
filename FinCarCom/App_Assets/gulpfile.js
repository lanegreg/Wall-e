
const buildPath = './dist'
const config = {
  isProductionBuild: process.env.NODE_ENV === 'production',
  buildPath: buildPath,
  publicBuildPath: buildPath + '/public',
  cssGlob: './_assets/global.css',
  imgGlob: [
    // './_assets/sprite.svg',
    './_assets/*.png',
    './_assets/*.jpg'
  ]
  // ,
  // favicoGlob: [
  //   './_assets/favicon.ico'
  // ]
}

console.log(' Gulp build for =>', process.env.NODE_ENV || 'development')


const path = require('path')
    , gulp = require('gulp')
    , csso = require('gulp-csso')
    , rename = require('gulp-rename')
    , imagemin = require('gulp-imagemin')
    , watch = require('gulp-watch')
    , gulpif = require('gulp-if')


gulp.task('css', () => {
  return gulp.src(config.cssGlob)
    .pipe(gulpif(!config.isProductionBuild, watch(config.cssGlob)))
    .pipe(csso())
    .pipe(rename('global.min.css'))
    .pipe(gulp.dest(path.join(config.buildPath, 'css')))
})


gulp.task('img', () => {
  return gulp.src(config.imgGlob)
    .pipe(gulpif(!config.isProductionBuild, watch(config.imgGlob)))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(path.join(config.buildPath, 'img')))
})

// gulp.task('favico', () => {
//   return gulp.src(config.favicoGlob)
//     .pipe(gulp.dest(config.buildPath))
// })

gulp.task('default', ['css', 'img'])


gulp.on('stop', () => {
  if (config.isProductionBuild) {
    process.nextTick(() => {
      process.exit(0)
    })
  }
})
