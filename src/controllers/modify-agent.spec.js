import makeModifyAgent from './modify-agent'
import makeFakeAgent from '../../__test__/fixtures/agent'

describe('edit agent controller', () => {
  it('successfully edite an agent', async () => {
    const fakeAgent = makeFakeAgent()
    const editAgent = makeModifyAgent({ editAgent: agent => agent })
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        id: fakeAgent.id
      },
      body: fakeAgent
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(fakeAgent.modifiedOn).toUTCString()
      },
      statusCode: 200,
      body: { edited: request.body }
    }
    const actual = await editAgent(request)
    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const fakeAgent = makeFakeAgent()
    const editAgent = makeModifyAgent({
      editAgent: () => {
        throw Error('Agent not modify')
      }
    })
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        id: fakeAgent.id
      },
      body: fakeAgent
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Agent not modify' }
    }
    const actual = await editAgent(request)
    expect(actual).toEqual(expected)
  })
})