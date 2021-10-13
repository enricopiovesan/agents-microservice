import express from 'express'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
app.use(bodyParser.json())

// listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})


export default app