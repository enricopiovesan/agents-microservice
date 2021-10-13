import Id from '../Id'
import buildMakeAgent from './agent'

function md5 (text) {
    return crypto
      .createHash('md5')
      .update(text, 'utf-8')
      .digest('hex')
  }

const makeAgent = buildMakeAgent({ Id, md5 })

export default makeAgent


