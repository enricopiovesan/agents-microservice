export default function makeDeleteAgent ({ removeAgent }) {
    return async function deleteAgent (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const deleted = await removeAgent({ id: httpRequest.params.id })
        return {
          headers,
          statusCode: deleted.deletedCount === 0 ? 404 : 200,
          body: { deleted }
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