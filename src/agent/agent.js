// do NOT import or require any dependecy

export default function buildMakeAgent({ Id, md5, }) {
  // this function returns an instace of agent
  return function makeAgent({
    name,
    createdOn = Date.now(),
    id = Id.makeId(),
    modifiedOn = Date.now(),
    companyId,
    active = false,
    busy = false,
    enabled = true,
    description
  } = {}) {

    // validation is very easy to read and you have all the business rules in one place
    if (!Id.isValidId(id)) {
      throw new Error('Agent must have a valid id.')
    }
    if (!name) {
      throw new Error('Agent must have a name.')
    }
    if (name.length < 2) {
      throw new Error("Agent name's must be longer than 2 characters.")
    }
    if (!companyId) {
      throw new Error('Agent must contain a companyId.')
    }
    if (!description || description.length < 5) {
      throw new Error('Agent must include at least five character of description.')
    }

    const deletedDescription = '.xX This agent has been deleted Xx.'
    let hash

    // the consumer of this fuction are alow to just read the propeties but not modify it
    // it will impossible to have this obj in an invalid state

    return Object.freeze({
      getName: () => name,
      getCreatedOn: () => createdOn,
      getHash: () => hash || (hash = makeHash()),
      getId: () => id,
      getModifiedOn: () => modifiedOn,
      getCompanyId: () => companyId,
      getDescription: () => description,
      isDeleted: () => description === deletedDescription,
      isActive: () => active,
      isBusy: () => busy,
      isEnabled: () => enabled,
      markDeleted: () => {
        sanitizedText = deletedText
        name = 'deleted'
      },
      online: () => {
        active = true
      },
      offline: () => {
        active = false
      },
      enable: () => {
        enabled = true
      },
      disable: () => {
        enabled = false
      }
    })

    function makeHash() {
      return md5(
        description +
        active +
        (name || '') +
        (companyId || '')
      )
    }
  }
}