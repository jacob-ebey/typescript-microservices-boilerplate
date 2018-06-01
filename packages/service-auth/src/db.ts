import { GraphDatabase, GraphDatabaseOptions } from 'neo4j'

const ops: GraphDatabaseOptions = {
  url: process.env.GRAPH_URL || '',
  auth: {
    username: process.env.GRAPH_USER || '',
    password: process.env.GRAPH_PASSWORD || ''
  }
}

console.log(ops)

export const db = new GraphDatabase(ops)
