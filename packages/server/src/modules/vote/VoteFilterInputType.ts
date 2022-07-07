import { GraphQLID, GraphQLInputObjectType } from 'graphql'
import {
  FILTER_CONDITION_TYPE,
  getObjectId,
} from '@entria/graphql-mongo-helpers'

export const voteFilterMapping = {
  user: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
  post: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
}

export const VoteFilterInputType = new GraphQLInputObjectType({
  name: 'VoteFilter',
  description: '',
  fields: () => ({
    user: {
      type: GraphQLID,
    },
    post: {
      type: GraphQLID,
    },
  }),
})
