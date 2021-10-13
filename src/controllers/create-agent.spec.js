import makeCreateAgent from './create-agent'
import makeFakeAgent from '../../__test__/fixtures/agent'

describe('create agent controller', () => {
  it('successfully creates an agent', async () => {
    const createAgent = makeCreateAgent({ addAgent: a => a })
    const agent = makeFakeAgent()
    const request = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: agent
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(request.body.modifiedOn).toUTCString()
      },
      statusCode: 201,
      body: { createed: request.body }
    }
    const actual = await createAgent(request)
    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const createAgent = makeCreateAgent({
      addAgent: () => {
        throw Error('Agent not created')
      }
    })
    const fakeAgent = makeFakeAgent()
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: fakeAgent
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Agent not created' }
    }
    const actual = await createAgent(request)
    expect(actual).toEqual(expected)
  })
})