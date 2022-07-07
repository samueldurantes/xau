import { graphql } from 'graphql'

import { connectWithMongoose, disconnectWithMongoose } from '../../../../test'
import { createPost } from '../../post/fixtures/createPost'
import { createUser } from '../../user/fixtures/createUser'
import { schema } from '../../../schemas/schema'
import { getContext } from '../../../getContext'

beforeAll(connectWithMongoose)
afterAll(disconnectWithMongoose)

it('should remove a vote from a post', async () => {
  const post = await createPost()
  const user = await createUser()

  // TODO: write a fixture to this
  const mutation = `
    mutation M($post: ID!) {
      votePostMutation(input: { post: $post }) {
        post {
          title
          body
          votes
        }
      }
    }
  `

  const mutation1 = `
    mutation M($post: ID!) {
      removeVotePostMutation(input: { post: $post }) {
        post {
          title
          body
          votes
        }
      }
    }
  `

  await graphql({
    schema,
    source: mutation,
    contextValue: await getContext({ user }),
    variableValues: {
      post: post.id,
    },
  })

  const result = await graphql({
    schema,
    source: mutation1,
    contextValue: await getContext({ user }),
    variableValues: {
      post: post.id,
    },
  })

  expect(result.errors).toBeUndefined()

  // @ts-ignore
  const { post: _post } = result.data?.removeVotePostMutation as any

  expect(_post.title).toBe(post.title)
  expect(_post.body).toBe(post.body)
  expect(_post.votes).toBe(0)
})
