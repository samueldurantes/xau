import { graphql } from 'graphql'

import {
  clearDatabase,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test'
import { createUser } from '../../user/fixtures/createUser'
import { schema } from '../../../schemas/schema'
import { getContext } from '../../../getContext'

beforeAll(connectWithMongoose)
beforeAll(clearDatabase)
afterAll(disconnectWithMongoose)

it('should create a post', async () => {
  const user = await createUser()

  const mutation = `
    mutation M($title: String!, $body: String!) {
      postCreateMutation(input: { title: $title, body: $body }) {
        post {
          title
          body
          author {
            username
          }
        }
      }
    }
  `

  const variableValues = {
    title: 'Hello, World!',
    body: 'console.log("Hello, World!");',
  }

  const result = await graphql({
    schema,
    source: mutation,
    contextValue: await getContext({ user }),
    variableValues,
  })

  expect(result.errors).toBeUndefined()

  const { post } = result.data?.postCreateMutation as any

  expect(post.title).toBe(variableValues.title)
  expect(post.body).toBe(variableValues.body)
})

it('should give error because it is not authenticated', async () => {
  const mutation = `
    mutation M($title: String!, $body: String!) {
      postCreateMutation(input: { title: $title, body: $body }) {
        post {
          title
          body
        }
      }
    }
  `

  const variableValues = {
    title: 'Hello, World!',
    body: 'console.log("Hello, World!");',
  }

  const result = await graphql({
    schema,
    source: mutation,
    variableValues,
  })

  expect(result.errors).toBeDefined()

  // @ts-ignore
  expect(result.errors[0].message).toBe('You are not logged in!')
})
