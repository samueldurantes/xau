import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { GraphQLContext } from 'src/modules/graphql/types'
import { PostModel } from '../PostModel'
import { PostType } from '../PostType'
import { UserModel } from '../../user/UserModel'

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
    post: {
      type: PostType,
      resolve: ({ post }) => post,
    },
  }),
})
