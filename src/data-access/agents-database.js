const COLLECTION = 'agents';

export default function makeAgentsDatabase ({ makeDatabase }) {
    return Object.freeze({
      findAll,
      findByHash,
      findById,
      findByAgentId,
      insert,
      remove,
      update
    })
    async function findAll ({ publishedOnly = true } = {}) {
      const db = await makeDatabase()
      const query = publishedOnly ? { published: true } : {}
      const result = await db.collection(COLLECTION).find(query)
      return (await result.toArray()).map(({ _id: id, ...found }) => ({
        id,
        ...found
      }))
    }
    async function findById ({ id: _id }) {
      const db = await makeDatabase()
      const result = await db.collection(COLLECTION).find({ _id })
      const found = await result.toArray()
      if (found.length === 0) {
        return null
      }
      const { _id: id, ...info } = found[0]
      return { id, ...info }
    }
    async function findByAgentId ({ agentId }) {
      const db = await makeDatabase()
      const query = { agentId: agentId }
      const result = await db.collection(COLLECTION).find(query)
      return (await result.toArray()).map(({ _id: id, ...found }) => ({
        id,
        ...found
      }))
    }
 
    async function insert ({ id: _id = Id.makeId(), ...agentInfo }) {
      const db = await makeDatabase()
      const result = await db
        .collection(COLLECTION)
        .insertOne({ _id, ...agentInfo })
      const { _id: id, ...insertedInfo } = result.ops[0]
      return { id, ...insertedInfo }
    }
  
    async function update ({ id: _id, ...agentInfo }) {
      const db = await makeDatabase()
      const result = await db
        .collection(COLLECTION)
        .updateOne({ _id }, { $set: { ...agentInfo } })
      return result.modifiedCount > 0 ? { id: _id, ...agentInfo } : null
    }
    async function remove ({ id: _id }) {
      const db = await makeDatabase()
      const result = await db.collection(COLLECTION).deleteOne({ _id })
      return result.deletedCount
    }
    async function findByHash (agent) {
      const db = await makeDatabase()
      const result = await db.collection(COLLECTION).find({ hash: agent.hash })
      const found = await result.toArray()
      if (found.length === 0) {
        return null
      }
      const { _id: id, ...insertedInfo } = found[0]
      return { id, ...insertedInfo }
    }
  }