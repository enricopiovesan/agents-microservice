import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
  deleteAgent,
  getAgents,
  getAgent,
  notFound,
  createAgent,
  editAgent
} from './controllers'
import makeCallback from './express-callback'

dotenv.config()

const apiRoot = process.env.API_ROOT
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  app.delete(`${apiRoot}/agents/:id`, makeCallback(deleteAgent))
//  app.delete(`${apiRoot}/agents`, makeCallback(deleteAgent))
//  app.patch(`${apiRoot}/agents/:id`, makeCallback(editAgent))
//  app.patch(`${apiRoot}/agents`, makeCallback(editAgent))

// API

const router = express.Router();
router.get(`/agent`, makeCallback(getAgent))
router.get(`/agents`, makeCallback(getAgents))
router.post(`/agents`, makeCallback(createAgent))

app.use(`/${apiRoot}`, router)
app.use(makeCallback(notFound))

app.listen(3000, () => {
  console.log('Server is listening on port 3000 ')
})

export default app