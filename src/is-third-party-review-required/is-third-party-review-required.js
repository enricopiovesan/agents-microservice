export default function makeIsThirdPartyReviewRequired({
    // thirthParty1,
    // thirthParty2,
    // thirthParty3,
}) {
    return async function isThirdPartyReviewRequired({
        // name,
        // description,
        // ...
    } = {}) {
        // const callThirthParty1 = thirthParty1()
        // const callThirthParty2 = thirthParty2()
        try {
            // const [thirthParty1Response, thirthParty2Response] = await Promise.all([
            //    thirthParty1(),
            //    thirthParty2()
            // ])
            // return thirthParty1Response || thirthParty2Response
        } catch (e) {
            console.log(e)
            return true
        }
    }
}