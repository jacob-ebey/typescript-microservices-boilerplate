import * as fs from 'fs'
import * as path from 'path'
const mergeTypes = require('merge-graphql-schemas').mergeTypes

const cwd = path.join(process.cwd(), 'src', 'graphql', 'schemas')
const meSchema = fs.readFileSync(path.join(cwd, 'me.graphql'))
const userSchema = fs.readFileSync(path.join(cwd, 'user.graphql'))

export default mergeTypes([
  meSchema.toString('UTF-8'),
  userSchema.toString('UTF-8')
], { all: true })
