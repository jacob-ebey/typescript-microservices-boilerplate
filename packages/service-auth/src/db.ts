const seraph = require('seraph')

console.info('Connecting DB...')

export const db = seraph({
  server: process.env.GRAPH_URL,
  user: process.env.GRAPH_USER,
  pass: process.env.GRAPH_PASSWORD
})

console.info('DB Connected')
