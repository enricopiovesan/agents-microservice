export default function makeFindAgent({ agentsDatabase }) {
    return async function findAgent({ id } = {}) {
        if (!id) {
            throw new Error('You must supply an agent id.')
        }
        const agents = await agentsDatabase.findById({
            id
        })
        return agents
    }
}