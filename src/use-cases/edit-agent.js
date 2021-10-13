export default function makeEditAgent({ agentsDatabase, agent }) {
    return async function editAgent({ id, ...changes } = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        if (!changes.text) {
            throw new Error('You must supply description.')
        }
        const existing = await agentsDatabase.findById({ id })

        if (!existing) {
            throw new RangeError('Agent not found.')
        }
        const updated = await agentsDatabase.update({
            id: agent.getId(),
            active: agent.isActive(),
            modifiedOn: agent.getModifiedOn(),
            description: agent.getDescription(),
            hash: agent.getHash()
        })
        return { ...existing, ...updated }
    }
}