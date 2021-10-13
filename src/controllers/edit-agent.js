export default function makeEditAgent ({ editAgent }) {
    return async function modifyAgent (httpRequest) {
      try {
        const { ...agentInfo } = httpRequest.body
     
        const toEdit = {
          ...agentInfo,
          id: httpRequest.params.id
        }
        const edited = await editAgent(toEdit)
        return {
          headers: {
            'Content-Type': 'application/json',
            'Last-Modified': new Date(edited.modifiedOn).toUTCString()
          },
          statusCode: 200,
          body: { edited }
        }
      } catch (e) {
        console.log(e)
        if (e.name === 'RangeError') {
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 404,
            body: {
              error: e.message
            }
          }
        }
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