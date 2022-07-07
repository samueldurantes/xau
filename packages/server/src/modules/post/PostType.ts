import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import {
  connectionDefinitions,
  timestampResolver,
} from '@entria/graphql-mongo-helpers'

import { PostDocument } from './PostModel'
import { load } from './PostLoader'
import { UserType } from '../user/UserType'
import * as UserLoader from '../user/UserLoader'
import { nodeInterface, registerTypeLoader } from '../graphql/typeRegister'
import { VoteModel } from '../vote/VoteModel'

export const PostType = new GraphQLObjectType<PostDocument>({
  name: 'Post',
  description: 'Post Type',
  fields: () => ({
    id: globalIdField('Post'),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.title,
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.body,
    },
    votes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (post) => VoteModel.countDocuments({ post: post._id }),
    },
    meHasVoted: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: async (post, _, context) => {
        if (!context.user) return false

        return (
          (await VoteModel.countDocuments({
            user: context.user._id,
            post: post._id,
          })) > 0
        )
      },
    },
    author: {
      type: UserType,
      resolve: (post, _, context) => UserLoader.load(context, post.author._id),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
})

registerTypeLoader(PostType, load)

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
})
