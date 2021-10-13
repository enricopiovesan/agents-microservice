export default function makeListAgents({ agentsDatabase }) {
    return async function listAgents({ companyId } = {}) {
        if (!companyId) {
            throw new Error('You must supply a company id.')
        }
        const agents = await agentsDatabase.findByPostId({
            companyId
        })
        return agents
    }
}