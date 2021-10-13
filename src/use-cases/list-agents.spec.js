import makeGetAgents from './list-agents'
import makeAgentsDatabase from '../data-access/agents-database'
import makeFakeAgent from '../../__test__/fixtures/agent'
import makeDatabase from '../../__test__/fixtures/database'

describe('get agents', () => {
    let agentsDatabase, getAgents
    beforeAll(() => {
        agentsDatabase = makeAgentsDatabase({ makeDatabase })
        getAgents = makeGetAgents({ agentsDatabase })
    })

    it('requires a company id', () => {
        expect(getAgents()).rejects.toThrow('You must supply a company id.')
    })
    it('gets all agents', async () => {
        const firstAgent = makeFakeAgent({ companyId: null })
        const secondAgent = makeFakeAgent({
            companyId: firstAgent.companyId
        })
        const thirdAgent = makeFakeAgent({
            companyId: firstAgent.companyId
        })
        const anotherReplyToFirstAgent = makeFakeAgent({
            companyId: firstAgent.companyId
        })
        const agents = [
            firstAgent,
            secondAgent,
            thirdAgent,
            anotherReplyToFirstAgent,
        ]
        await Promise.all(agents.map(agentsDatabase.insert))
        return Promise.all(agents.map(agentsDatabase.remove))
    })
})