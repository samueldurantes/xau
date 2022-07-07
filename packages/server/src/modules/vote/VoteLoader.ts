import { createLoader } from '@entria/graphql-mongo-helpers'

import { registerLoader } from '../loader/loaderRegister'
import { VoteModel } from './VoteModel'
import { voteFilterMapping } from './VoteFilterInputType'

const {
  Wrapper: Vote,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: VoteModel,
  loaderName: 'VoteLoader',
  filterMapping: voteFilterMapping,
})

export { getLoader, clearCache, load, loadAll }

export default Vote

registerLoader('VoteLoader', getLoader)
