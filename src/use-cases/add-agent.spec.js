import makeAddAgent from './add-agent'
import makeAgentsDatabase from '../data-access/agents-database'
import makeFakeAgent from '../../__test__/fixtures/agent'
import makeDatabase from '../../__test__/fixtures/db'

describe('add agent', () => {
    let agentsDatabase
    beforeAll(() => {
        agentsDatabase = makeAgentsDatabase({ makeDatabase })
    })

    it('inserts agents in the database', async () => {
        const newAgent = makeFakeAgent()
        const addAgent = makeAddAgent({ agentsDatabase })
        const inserted = await addAgent(newAgent)
        expect(inserted).toMatchObject(newAgent)
    })
    it('is id', async () => {
        const addAgent = makeAddAgent({
            agentsDatabase
        })
        const newAgent = makeFakeAgent({ id: undefined })
        const insertOne = await addAgent(newAgent)
        const insertTwo = await addAgent(newAgent)
        expect(insertOne.id).toBeDefined()
        expect(insertOne.id).toBe(insertTwo.id)
    })
})