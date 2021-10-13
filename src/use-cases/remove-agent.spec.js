import makeRemoveAgent from './remove-agent'
import makeAgentsDatabase from '../data-access/agents-database'
import makeFakeAgent from '../../__test__/fixtures/agent'
import makeDatabase from '../../__test__/fixtures/database'
import makeAgent from '../agent'

describe('remove agent', () => {
    let agentsDatabase
    beforeAll(() => {
        agentsDatabase = makeAgentsDatabase({ makeDatabase })
    })
    it('handles non existent agents', async () => {
        const removeAgent = makeRemoveAgent({
            agentsDatabase
        })
        const fakeAgent = makeFakeAgent()
        const expected = {
            deletedCount: 0,
            softDelete: false,
            message: 'Agent not found, nothing to delete.'
        }
        const actual = await removeAgent(fakeAgent)
        expect(actual).toEqual(expected)
    })
    it('hard deletes agents with no company', async () => {
        const removeAgent = makeRemoveAgent({
            agentsDatabase
        })

        const fakeAgent = makeFakeAgent()
        await agentsDatabase.insert(fakeAgent)

        const found = await agentsDatabase.findById(fakeAgent)
        expect(found).toEqual(fakeAgent)

        const expected = {
            deletedCount: 1,
            softDelete: false,
            message: 'Agent deleted.'
        }

        const actual = await removeAgent(fakeAgent)
        expect(actual).toEqual(expected)

        const notFound = await agentsDatabase.findById(fakeAgent)
        expect(notFound).toBe(null)
    })
    it('soft deletes agents associated with a company ', async () => {
        const removeAgent = makeRemoveAgent({
            agentsDatabase
        })

        const fakeAgent = makeFakeAgent()
        await agentsDatabase.insert(fakeAgent)

        const fakeAgentReply = makeFakeAgent({
            replyToId: fakeAgent.id
        })
        await agentsDatabase.insert(fakeAgentReply)

        const expected = {
            deletedCount: 1,
            softDelete: true,
            message: 'Agent has company. Soft deleted.'
        }
        const actual = await removeAgent(fakeAgent)
        expect(actual).toEqual(expected)

        const deleted = await agentsDatabase.findById(fakeAgent)
        expect(makeAgent(deleted).isDeleted()).toBe(true)
        await agentsDatabase.remove(fakeAgentReply)
        await agentsDatabase.remove(fakeAgent)
    })
    it('hard deletes an agent and its deleted parent when there are no other chats', async () => {
        const removeAgent = makeRemoveAgent({
            agentsDatabase
        })

        const fakeAgent = makeFakeAgent()

        const fakeReply = makeFakeAgent({
            chatId: fakeAgent.id,
            companyId: fakeAgent.companyId,
            published: true
        })
        console.log({ fakeReply })
        const [insertedParent, insertedReply] = await Promise.all([
            agentsDatabase.insert(fakeAgent),
            agentsDatabase.insert(fakeReply)
        ])
        const parentDelete = await removeAgent(insertedParent)
        expect(parentDelete.softDelete).toBe(true)

        const expected = {
            deletedCount: 2,
            softDelete: false,
            message: 'Agent and parent deleted.'
        }
        const actual = await removeAgent(insertedReply)
        expect(actual).toEqual(expected)

        await agentsDatabase.remove(fakeReply)
        await agentsDatabase.remove(fakeAgent)
    })
})