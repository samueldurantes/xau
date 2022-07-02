import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { connectionDefinitions } from '@entria/graphql-mongo-helpers'

import { Post } from './PostModel'
import { load } from './PostLoader'
import { UserType } from '../user/UserType'
import * as UserLoader from '../user/UserLoader'
import { nodeInterface, registerTypeLoader } from '../graphql/typeRegister'

export const PostType = new GraphQLObjectType<Post>({
  name: 'Post',
  description: 'Post Type',
  fields: () => ({
    id: globalIdField('Post'),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.title
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.body
    },
    votes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (post) => post.votes
    },
    author: {
      type: UserType,
      resolve: (post, _, context) => UserLoader.load(context, post.author)
    }
  }),
  interfaces: () => [nodeInterface]
})

registerTypeLoader(PostType, load)

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType
})
