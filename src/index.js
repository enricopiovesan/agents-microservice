import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
  deleteAgent,
  getAgents,
  notFound,
  createAgent,
  editAgent
} from './controllers'
import makeCallback from './express-callback'

dotenv.config()

const apiRoot = process.env.DM_API_ROOT
const app = express()
app.use(bodyParser.json())
app.use((_, res, next) => {
  res.set({ Tk: '!' })
  next()
})
app.post(`${apiRoot}/agents`, makeCallback(createAgent))
app.delete(`${apiRoot}/agents/:id`, makeCallback(deleteAgent))
app.delete(`${apiRoot}/agents`, makeCallback(deleteAgent))
app.patch(`${apiRoot}/agents/:id`, makeCallback(editAgent))
app.patch(`${apiRoot}/agents`, makeCallback(editAgent))
app.get(`${apiRoot}/agents`, makeCallback(getAgents))
app.use(makeCallback(notFound))

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})


export default app