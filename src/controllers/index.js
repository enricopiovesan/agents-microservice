
import {
    addAgent,
    editAgent,
    listAgents,
    removeAgent
  } from '../use-cases'
  import makeDeleteAgent from './delete-agent'
  import makeGetAgents from './get-agents'
  import makeCreateAgent from './create-agent'
  import makeEditAgent from './edit-agent'
  import notFound from './not-found'
  
  const deleteAgent = makeDeleteAgent({ removeAgent })
  const getAgents = makeGetAgents({
    listAgents
  })
  const createAgent = makeCreateAgent({ addAgent })
  const editAgent = makeEditAgent({ editAgent })
  
  const agentController = Object.freeze({
    deleteAgent,
    getAgents,
    notFound,
    createAgent,
    editAgent
  })
  
  export default agentController
  export { deleteAgent, getAgents, notFound, createAgent, editAgent }