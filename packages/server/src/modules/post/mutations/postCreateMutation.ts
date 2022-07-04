import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { GraphQLContext } from 'src/modules/graphql/types'
import { PostModel } from '../PostModel'
import { PostType } from '../PostType'

export const postCreate = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) }
  },
  mutateAndGetPayload: async ({ title, body }, ctx: GraphQLContext) => {
    if (!ctx?.user) {
      throw new Error('You are not logged in!')
    }

    const post = new PostModel({
      title,
      body,
      author: ctx.user
    })

    await Promise.all([
      post.save(),
      ctx.user.update({
        $addToSet: { posts: post._id }
      })
    ])

    return { post }
  },
  outputFields: () => ({
    post: {
      type: PostType,
      resolve: ({ post }) => post
    }
  })
})
