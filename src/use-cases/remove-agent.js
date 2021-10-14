import makeAgent from '../agent'

export default function makeRemoveAgent({ agentsDatabase }) {
    return async function removeAgent({ id } = {}) {
        if (!id) {
            throw new Error('You must supply a agent id.')
        }

        const agentToDelete = await agentsDatabase.findById({ id })

        if (!agentToDelete) {
            return deleteNothing()
        }

        if (await hasChats(agentToDelete)) {
            return softDelete(agentToDelete)
        }

        return hardDelete(agentToDelete)
    }

    async function hasChats({ id: agentId }) {
        const chats = await agentsDatabase.findChats({
            agentId
        })
        return chats.length > 0
    }

    function deleteNothing() {
        return {
            deletedCount: 0,
            softDelete: false,
            message: 'Agent not found, nothing to delete.'
        }
    }

    async function softDelete(agentInfo) {
        const toDelete = makeAgent(agentInfo)
        // the use case in this case doesn't need to know about the implementation of markDeleted
        toDelete.markDeleted()
        await agentsDatabase.update({
            id: toDelete.getId(),
            name: toDelete.getName(),
            description: toDelete.getDescription(),
            companyId: toDelete.getPostId()
        })
        return {
            deletedCount: 1,
            softDelete: true,
            message: 'Agent has chats. Soft deleted.'
        }
    }

    async function hardDelete(agent) {
        await agentsDatabase.remove(agent)
        return {
            deletedCount: 1,
            softDelete: false,
            message: 'Agent deleted.'
        }
    }
}