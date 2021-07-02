const { src, dest, parallel } = require('gulp');

function js() {
  return src(['node_modules/blockly/*_compressed.js'], { sourcemaps: true })
    .pipe(dest('public/js', { sourcemaps: true }))
}

function img() {
  return src(['node_modules/blockly/media/*.cur',
        'node_modules/blockly/media/*.png',
        'node_modules/blockly/media/*.cur'], { sourcemaps: true })
    .pipe(dest('public/img', { sourcemaps: true }))
}




function msgjs() {
  return src(['node_modules/blockly/msg/*.js'], { sourcemaps: true })
    .pipe(dest('public/js/msg', { sourcemaps: true }))
}

exports.default = parallel(msgjs, js,img);
