
export default function makeGetAgent({ findAgent }) {
    return async function getAgent(httpRequest) {

        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const agent = await findAgent({
                id: httpRequest.query.id
            })
            return {
                headers,
                statusCode: 200,
                body: agent
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