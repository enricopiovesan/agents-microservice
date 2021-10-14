import makeAddAgent from './add-agent'
import makeEditAgent from './edit-agent'
import makeRemoveAgent from './remove-agent'
import makeListAgents from './list-agents'
import makeFindAgent from './find-agent'
import agentsDatabase from '../data-access'

const addAgent = makeAddAgent({ agentsDatabase })
const editAgent = makeEditAgent({ agentsDatabase })
const listAgents = makeListAgents({ agentsDatabase })
const findAgent = makeFindAgent({ agentsDatabase })
const removeAgent = makeRemoveAgent({ agentsDatabase })

const agentService = Object.freeze({
    addAgent,
    editAgent,
    listAgents,
    findAgent,
    removeAgent
})

export default agentService
export { addAgent, editAgent, listAgents, findAgent, removeAgent }