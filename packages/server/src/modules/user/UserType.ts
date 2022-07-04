import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import {
  connectionDefinitions,
  connectionArgs,
  withFilter,
} from '@entria/graphql-mongo-helpers'

import { User } from './UserModel'
import { load } from './UserLoader'
import { PostConnection } from '../post/PostType'
import * as PostLoader from '../post/PostLoader'
import { nodeInterface, registerTypeLoader } from '../graphql/typeRegister'

export const UserType = new GraphQLObjectType<User>({
  name: 'User',
  description: 'User Type',
  fields: () => ({
    id: globalIdField('User'),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.username,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.password,
    },
    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async (user, args, context) => {
        await PostLoader.loadAll(
          context,
          withFilter(args, { author: user._id }),
        )
      },
    },
  }),
  interfaces: () => [nodeInterface],
})

registerTypeLoader(UserType, load)

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
})
