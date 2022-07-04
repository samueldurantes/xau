import { GraphQLObjectType } from 'graphql'

import * as userMutations from '../modules/user/mutations'

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    ...userMutations
  })
})
