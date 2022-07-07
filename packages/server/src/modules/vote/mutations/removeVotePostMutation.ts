import { getObjectId } from '@entria/graphql-mongo-helpers'
import { GraphQLNonNull, GraphQLID } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { GraphQLContext } from '../../graphql/types'
import { PostModel } from '../../post/PostModel'
import { PostType } from '../../post/PostType'
import { VoteModel } from '../VoteModel'
import * as PostLoader from '../../post/PostLoader'

export const removeVotePostMutation = mutationWithClientMutationId({
  name: 'RemoveVotePost',
  inputFields: {
    post: { type: new GraphQLNonNull(GraphQLID) },
  },
  mutateAndGetPayload: async (args: { post: string }, ctx: GraphQLContext) => {
    if (!ctx?.user) {
      throw new Error('You are not logged in!')
    }

    const post = await PostModel.findOne({
      _id: getObjectId(args.post),
    })

    if (!post) {
      throw new Error('Post does not exist!')
    }

    const hasVoted = await VoteModel.findOne({
      user: ctx?.user._id,
      post,
    })

    if (!hasVoted) {
      throw new Error('Post has not yet been voted!')
    }

    await hasVoted.remove()

    return { post }
  },
  outputFields: () => ({
    post: {
      type: PostType,
      resolve: async ({ post }, _, ctx) => {
        return await PostLoader.load(ctx, post.id)
      },
    },
  }),
})
