
export default function makeGetAgents({ listAgents }) {
  return async function getAgents(httpRequest) {

    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const agents = await listAgents({
        companyId: httpRequest.query.companyId
      })
      return {
        headers,
        statusCode: 200,
        body: agents
      }
    } catch (e) {
      console.log(e)
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}