import { graphql } from 'graphql'

import { connectWithMongoose, disconnectWithMongoose } from '../../../../test'
import { schema } from '../../../schemas/schema'

beforeAll(connectWithMongoose)
afterAll(disconnectWithMongoose)

it('should create a new user', async () => {
  const mutation = `
    mutation M($username: String!, $password: String!) {
      userRegisterMutation(input: { username: $username, password: $password }) {
        token
        me {
          id
          username
        }
      }
    }
  `

  const result = await graphql({
    schema,
    source: mutation,
    rootValue: {},
    variableValues: {
      username: 'samuel',
      password: 'f3ad452ba4a69a91d0acfb64038f54a5',
    },
  })

  expect(result.errors).toBeUndefined()

  // TODO: improve this
  const user = result?.data?.userRegisterMutation as any

  expect(user.token).toBeDefined()
  expect(user.me.id).toBeDefined()
})
