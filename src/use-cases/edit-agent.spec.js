import makeEditAgent from './edit-agent'
import makeFakeAgent from '../../__test__/fixtures/agent'
import makeAgentsDatabase from '../data-access/agents-database'
import makeDatabase from '../../__test__/fixtures/database'

describe('edit agent', () => {
    let agentsDatabase
    beforeAll(() => {
        agentsDatabase = makeAgentsDatabase({ makeDatabase })
    })
    it('must include an id', () => {
        const editAgent = makeEditAgent({
            agentsDatabase: {
                update: () => {
                    throw new Error('update should not have been called')
                }
            }
        })
        const agentToEdit = makeFakeAgent({ id: undefined })
        expect(editAgent(agentToEdit)).rejects.toThrow('You must supply an id.')
    })
    it('must include description', () => {
        const editAgent = makeEditAgent({
            agentsDatabase: {
                update: () => {
                    throw new Error('update should not have been called')
                }
            }
        })
        const agentToEdit = makeFakeAgent({ id: undefined })
        expect(editAgent(agentToEdit)).rejects.toThrow('You must supply an id.')
    })
    it('modifies a agent', async () => {
        const editAgent = makeEditAgent({
            agentsDatabase

        })
        const fakeAgent = makeFakeAgent({
            modifiedOn: undefined
        })
        const inserted = await agentsDatabase.insert(fakeAgent)
        const edited = await editAgent({ ...fakeAgent, description: 'changed' })
        expect(edited.description).toBe('changed')
        expect(inserted.modifiedOn).not.toBe(edited.modifiedOn)
        expect(edited.hash).toBeDefined()
        expect(inserted.hash).not.toBe(edited.hash)
    })

})