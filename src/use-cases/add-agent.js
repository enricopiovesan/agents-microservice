export default function makeAddAgent({ agentsDatabase, agent }) {
    return async function addAgent() {
        const exists = await agentsDatabase.findByHash({ hash: agent.getHash() })
        if (exists) {
            return exists
        }

        return agentsDatabase.insert({
            name: agent.getName(),
            createdOn: agent.getCreatedOn(),
            hash: agent.getHash(),
            id: agent.getId(),
            modifiedOn: agent.getModifiedOn(),
            companyId: agent.getCompanyId(),
            active: agent.isActive(),
            text: agent.getText()
        })
    }
}