import makeFakeAgent from '../../__test__/fixtures/agent'
import makeAgent from './'
describe('agent', () => {
  it('must have a name', () => {
    const agent = makeFakeAgent({ name: null })
    expect(() => makeAgent(agent)).toThrow('Agent must have a name.')
  })

  it('must have a valid company id', () => {
    const agent = makeFakeAgent({ companyId: null })
    expect(() => makeAgent(agent)).toThrow('Agent must contain a companyId.')
  })
  it('must have valid description', () => {
    const agent = makeFakeAgent({ text: null })
    expect(() => makeAgent(agent)).toThrow(
      'Agent must include at least five character of description.'
    )
  })
  it('can have an id', () => {
    const agent = makeFakeAgent({ id: 'invalid' })
    expect(() => makeAgent(agent)).toThrow('Agent must have a valid id.')
    const noId = makeFakeAgent({ id: undefined })
    expect(() => makeAgent(noId)).not.toThrow()
  })
  it('can create an id', () => {
    const noId = makeFakeAgent({ id: undefined })
    const agent = makeAgent(noId)
    expect(agent.getId()).toBeDefined()
  })
  it('can be active', () => {
    const offline = makeFakeAgent({ active: false })
    const agent = makeAgent(offline)
    expect(agent.isActive()).toBe(false)
    agent.online()
    expect(agent.isActive()).toBe(true)
  })
  it('can be inactive', () => {
    const online = makeFakeAgent({ active: true })
    const agent = makeAgent(online)
    expect(agent.isActive()).toBe(true)
    agent.offline()
    expect(agent.isActive()).toBe(false)
  })
  it('is createdOn now in UTC', () => {
    const noCreationDate = makeFakeAgent({ createdOn: undefined })
    expect(noCreationDate.createdOn).not.toBeDefined()
    const d = makeAgent(noCreationDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('is modifiedOn now in UTC', () => {
    const noModifiedOnDate = makeFakeAgent({ modifiedOn: undefined })
    expect(noModifiedOnDate.modifiedOn).not.toBeDefined()
    const d = makeAgent(noModifiedOnDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('can be marked deleted', () => {
    const fake = makeFakeAgent()
    const a = makeAgent(fake)
    a.markDeleted()
    expect(a.isDeleted()).toBe(true)
    expect(a.getDescription()).toBe('.xX This agent has been deleted Xx.')
    expect(a.getName()).toBe('deleted')
  })
  it('includes a hash', () => {
    const fakeAgent = {
      name: 'Enrico Piovesan',
      description: "I'm Iron man.",
      postId: 'ABCD123',
      active: true
    }
    expect(makeAgent(fakeAgent).getHash()).toBe(
      'da75260ce9e447e3ed757ee39229c7ca'
    )
  })
})