import makeAddAgent from './add-agent'
import makeEditAgent from './edit-agent'
import makeRemoveAgent from './remove-agent'
import makeListAgents from './list-agents'
import makeFindAgent from './find-agent'
import agentsDatabase from '../data-access'
import makeHandleAgentData from './handle-agent-data'
import isThirdPartyReviewRequired from '../is-third-party-review-required'

const handleAgentData = makeHandleAgentData({
    isThirdPartyReviewRequired,
    initiateReview: async () => { } // Just a dumb function
})

const addAgent = makeAddAgent({ agentsDatabase, handleAgentData })
const editAgent = makeEditAgent({ agentsDatabase, handleAgentData })
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