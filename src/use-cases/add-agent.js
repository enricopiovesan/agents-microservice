// import just Entities
// do not import any controller or iterface

import makeAgent from '../agent'

export default function makeAddAgent({ agentsDatabase, handleAgentData }) {
    return async function addAgent(agentInfo) {

        // makeAgent uses agentInfo to make a valid agent obj
        const agent = makeAgent(agentInfo)

        // check if the agent is already in the DB using the agent's hash
        const exists = await agentsDatabase.findByHash({ hash: agent.getHash() })
        if (exists) {
            return exists
        }

        // future 3rt party validation
        const validatedAgent = await handleAgentData({ agent })

        /* 
            clean architecture principle demand to pass 
            information in the most convent way for the recipient, 
            in this case, is plain obj
        */
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