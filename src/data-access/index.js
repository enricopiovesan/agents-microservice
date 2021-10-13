import makeAgentsDatabase from './agents-database'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = process.env.AGENTS_DATABASE_URL
const dbName = process.env.AGENTS_DATABASE_NAME
const client = new MongoClient(url, { useNewUrlParser: true })

export async function makeDatabase () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(dbName)
}

const agentsDatabase = makeAgentsDatabase({ makeDatabase })
export default agentsDatabase