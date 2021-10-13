
import {
  addAgent,
  editAgent,
  listAgents,
  removeAgent
} from '../use-cases'
import makeDeleteAgent from './delete-agent'
import makeGetAgents from './get-agents'
import makeCreateAgent from './create-agent'
import makeModifyAgent from './modify-agent'
import notFound from './not-found'

const deleteAgent = makeDeleteAgent({ removeAgent })
const getAgents = makeModifyAgent({
  listAgents
})
const createAgent = makeCreateAgent({ addAgent })
const modifyAgent = makeModifyAgent({ editAgent })

const agentController = Object.freeze({
  deleteAgent,
  getAgents,
  notFound,
  createAgent,
  modifyAgent
})

export default agentController
export { deleteAgent, getAgents, notFound, createAgent, modifyAgent }