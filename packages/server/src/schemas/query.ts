import { GraphQLObjectType, GraphQLFieldConfig, GraphQLNonNull } from 'graphql'
import { connectionArgs } from '@entria/graphql-mongo-helpers'

import { nodeField, nodesField } from '../modules/graphql/typeRegister'
import * as PostLoader from '../modules/post/PostLoader'
import { PostConnection } from '../modules/post/PostType'

const posts: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(PostConnection.connectionType),
  args: { ...connectionArgs },
  resolve: async (_root, args, context) =>
    await PostLoader.loadAll(context, args),
}

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    posts,
  }),
})
