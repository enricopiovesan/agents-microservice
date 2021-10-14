import makeAgent from '../agent'
export default function makeAddAgent({ agentsDatabase, handleAgentData }) {
    return async function addAgent(agentInfo) {
        const agent = makeAgent(agentInfo)
        const exists = await agentsDatabase.findByHash({ hash: agent.getHash() })
        if (exists) {
            return exists
        }
        const validatedAgent = await handleAgentData({ agent })
        return agentsDatabase.insert({
            name: validatedAgent.getName(),
            createdOn: validatedAgent.getCreatedOn(),
            hash: validatedAgent.getHash(),
            id: validatedAgent.getId(),
            modifiedOn: validatedAgent.getModifiedOn(),
            companyId: validatedAgent.getCompanyId(),
            active: validatedAgent.isActive(),
            description: validatedAgent.getDescription(),
            enable: validatedAgent.isEnabled()
        })
    }
}