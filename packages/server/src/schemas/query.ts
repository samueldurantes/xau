import { GraphQLObjectType, GraphQLFieldConfig, GraphQLString } from 'graphql'

const hello: GraphQLFieldConfig<any, any, any> = {
  resolve: (_root, _args, _context) => 'Hello, World!',
  type: GraphQLString,
}

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    hello,
  }),
})
