const cp = require('child_process')
const fs = require('fs')
const path = require('path')

const isDirectory = source => fs.lstatSync(source).isDirectory()
const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)

const packages = getDirectories(path.join(process.cwd(), 'packages'))

const processes = packages.map(dir => {
  const p = path.join(dir, 'package.json')

  if (!fs.existsSync(p)) {
    return
  }

  try {
    const pack = JSON.parse(fs.readFileSync(p).toString())

    if (!pack || !pack.scripts || !pack.scripts.dev) {
      return
    }

    console.info(`Staring ${path.basename(dir)}`)
    const proc = cp.spawn('npm', ['run', 'dev'], {
      cwd: dir
    })

    proc.stdout.pipe(process.stdout)
    process.stdin.pipe(proc.stdin)

    return proc
  } finally {}
}).filter(p => !!p)

const keepRunning = setInterval(() => {}, 1 << 30)

const cleanupCallback = () => {
  console.warn('\nExiting...')

  processes.forEach((p) => {
    p.kill('SIGINT')
  })

  clearInterval(keepRunning)
  process.exit(0)
}

process.on('SIGINT', cleanupCallback.bind(null))
