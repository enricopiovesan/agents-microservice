import faker from 'faker'
import cuid from 'cuid'
import crypto from 'crypto'

const Id = Object.freeze({
    makeId: cuid,
    isValidId: cuid.isCuid
})

function md5(text) {
    return crypto
        .createHash('md5')
        .update(text, 'utf-8')
        .digest('hex')
}

export default function makeFakeAgent(overrides) {
    const agent = {
        name: faker.name.findName(),
        createdOn: Date.now(),
        id: Id.makeId(),
        modifiedOn: Date.now(),
        companyId: Id.makeId(),
        published: true,
        description: faker.lorem.paragraph(3),
    }
    agent.hash = md5(
        agent.description +
        agent.active +
        (agent.name || '') +
        (agent.companyId || '')
    )

    return {
        ...agent,
        ...overrides
    }
}