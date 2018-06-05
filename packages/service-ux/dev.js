const cmd = require('node-cmd')
const chokidar = require('chokidar')
const path = require('path')

const serverProcess = cmd.get('yarn dev:server')
serverProcess.stdout.pipe(process.stdout)
serverProcess.stderr.pipe(process.stderr)
process.stdin.pipe(serverProcess.stdin)

const webpackProcess = cmd.get('yarn dev:webpack')
webpackProcess.stderr.pipe(process.stderr)

chokidar.watch('./src')
  .on('add', fileChanged)
  .on('change', fileChanged)
  .on('unlink', fileChanged)

function debounce (func, wait, immediate) {
  let timeout

  return function () {
    const context = this
    const args = arguments

    var later = function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }

    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) {
      func.apply(context, args)
    }
  }
}

let tsFirstRun = true
let tsProcess
const buildTS = debounce(() => {
  if (tsFirstRun) {
    tsFirstRun = false
    return
  }

  if (tsProcess) {
    tsProcess.kill()
  }

  console.log('\x1b[36m', 'Building TS...')

  tsProcess = cmd.get('yarn build:ts', (err, data, stderr) => {
    if (err) {
      console.error('\x1b[31m', 'FAILED: Building TS')
      console.error('\x1b[31m', data)
      console.error('\x1b[31m', stderr)
      return
    }
    if (data) {
      console.log(data)
    }

    console.log('\x1b[32m', 'SUCCESS: Built TS')
  })
}, 3000)

let lessProcess
const buildLess = debounce(() => {
  if (lessProcess) {
    lessProcess.kill()
  }

  console.log('\x1b[36m', 'Building LESS...')

  lessProcess = cmd.get('yarn build:less', (err, data, stderr) => {
    if (err) {
      console.error('\x1b[31m', 'FAILED: Building LESS')
      console.error('\x1b[31m', stderr)
      return
    }
    if (data) {
      console.log(data)
    }

    console.log('\x1b[32m', 'SUCCESS: Built LESS')
  })
}, 3000)

function fileChanged (file) {
  switch (path.extname(file)) {
    case '.ts':
    case '.tsx':
      buildTS()
      break
    case '.less':
      buildLess()
      break
  }
}
