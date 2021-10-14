export default function makeHandleAgentData({
    isThirdPartyReviewRequired,
    initiateReview
}) {
    return async function handleAgentData({ agent }) {
        const shouldBeApproveByThirdPartyAPI = await isThirdPartyReviewRequired({
            description: agent.getDescription(),
            name: agent.getName(),
            createdOn: agent.getCreatedOn(),
            modifiedOn: agent.getModifiedOn()
        })
        const validated = { ...agent }
        if (shouldBeApproveByThirdPartyAPI) {
            initiateReview({ id: validated.getId(), content: validated.getDescription() })
            validated.disable()
        } else {
            validated.enable()
        }
        return validated
    }
}