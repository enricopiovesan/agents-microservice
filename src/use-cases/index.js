import makeAddAgent from './add-agent'
import makeEditAgent from './edit-agent'
import makeRemoveAgent from './remove-agent'
import makeListAgents from './list-agents'
import agentsDatabase from '../data-access'

const addAgent = makeAddAgent({ agentsDatabase, agent })
const editAgent = makeEditAgent({ agentsDatabase, agent })
const listAgents = makeListAgents({ agentsDatabase })
const removeAgent = makeRemoveAgent({ agentsDatabase })

const agentService = Object.freeze({
    addAgent,
    editAgent,
    listAgents,
    removeAgent
})

export default agentService
export { addAgent, editAgent, listAgents, removeAgent }