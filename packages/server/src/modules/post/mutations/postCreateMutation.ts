import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import { GraphQLContext } from '../../graphql/types'
import { PostModel } from '../PostModel'
import { PostConnection } from '../PostType'
import { UserModel } from '../../user/UserModel'
import * as PostLoader from '../PostLoader'

export const postCreateMutation = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ title, body }, ctx: GraphQLContext) => {
    if (!ctx?.user) {
      throw new Error('You are not logged in!')
    }

    const post = await new PostModel({
      title,
      body,
      author: ctx.user._id,
    }).save()

    await UserModel.findOneAndUpdate(
      {
        _id: ctx.user._id,
      },
      {
        $addToSet: { posts: post._id },
      },
    )

    return { post }
  },
  outputFields: () => ({
    postEdge: {
      type: PostConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const post = await PostLoader.load(context, id)

        if (!post) {
          return null
        }

        return {
          cursor: toGlobalId('Post', post._id),
          node: post,
        }
      },
    },
  }),
})
