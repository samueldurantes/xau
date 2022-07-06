import { graphql } from 'graphql'

import {
  clearDatabase,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test'
import { schema } from '../../../schemas/schema'
import { createUser } from '../fixtures/createUser'

beforeAll(connectWithMongoose)
beforeEach(clearDatabase)
afterAll(disconnectWithMongoose)

it('should login a registered user', async () => {
  const { username } = await createUser({
    username: 'samuel',
    password: 'f3ad452ba4a69a91d0acfb64038f54a5',
  })

  const mutation = `
    mutation UserLoginMutation($username: String!, $password: String!) {
      userLoginMutation(input: {username: $username, password: $password}) {
        token
        me {
          id
        }
      }
    }
  `

  const result = await graphql({
    schema,
    source: mutation,
    variableValues: {
      username,
      password: 'f3ad452ba4a69a91d0acfb64038f54a5',
    },
  })

  expect(result.errors).toBeUndefined()

  const user = result.data?.userLoginMutation as any

  expect(user.me.id).toBeDefined()
  expect(user.token).toBeDefined()
})

it('should give user not found error', async () => {
  await createUser()

  const mutation = `
    mutation UserLoginMutation($username: String!, $password: String!) {
      userLoginMutation(input: {username: $username, password: $password}) {
        token
        me {
          id
        }
      }
    }
  `

  const result = await graphql({
    schema,
    source: mutation,
    variableValues: {
      username: 'samuel',
      password: 'f3ad452ba4a69a91d0acfb64038f54a5',
    },
  })

  expect(result.data?.userLoginMutation).toBeNull()

  expect(result.errors).toBeDefined()
  // @ts-ignore
  expect(result.errors[0].message).toBe('User not found!')
})

it('should give wrong password error', async () => {
  const { username } = await createUser({ username: 'samuel' })

  const mutation = `
    mutation UserLoginMutation($username: String!, $password: String!) {
      userLoginMutation(input: {username: $username, password: $password}) {
        token
        me {
          id
        }
      }
    }
  `

  const result = await graphql({
    schema,
    source: mutation,
    variableValues: {
      username,
      password: 'f3ad452ba4a69a91d0acfb64038f54a5',
    },
  })

  expect(result.data?.userLoginMutation).toBeNull()

  expect(result.errors).toBeDefined()
  // @ts-ignore
  expect(result.errors[0]?.message).toBe('Password is incorrect!')
})
