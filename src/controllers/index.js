
import {
  addAgent,
  editAgent,
  listAgents,
  findAgent,
  removeAgent
} from '../use-cases'
import makeDeleteAgent from './delete-agent'
import makeGetAgents from './get-agents'
import makeCreateAgent from './create-agent'
import makeModifyAgent from './modify-agent'
import makeGetAgent from './get-agent'
import notFound from './not-found'

const deleteAgent = makeDeleteAgent({ removeAgent })
const getAgents = makeGetAgents({
  listAgents
})
const getAgent = makeGetAgent({
  findAgent
})
const createAgent = makeCreateAgent({ addAgent })
const modifyAgent = makeModifyAgent({ editAgent })

const agentController = Object.freeze({
  deleteAgent,
  getAgents,
  getAgent,
  notFound,
  createAgent,
  modifyAgent
})

export default agentController
export { deleteAgent, getAgents, getAgent, notFound, createAgent, modifyAgent }