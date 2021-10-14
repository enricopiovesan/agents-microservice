
export default function makeCreateAgent({ addAgent }) {
  return async function createAgent(httpRequest) {
    try {
      const { ...agentInfo } = httpRequest.body
      const createed = await addAgent({
        ...agentInfo
      })
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(createed.modifiedOn).toUTCString()
        },
        statusCode: 201,
        body: { createed }
      }
    } catch (e) {
      console.log(e)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}