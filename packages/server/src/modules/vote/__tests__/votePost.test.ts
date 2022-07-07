import { graphql } from 'graphql'

import { connectWithMongoose, disconnectWithMongoose } from '../../../../test'
import { createPost } from '../../post/fixtures/createPost'
import { createUser } from '../../user/fixtures/createUser'
import { schema } from '../../../schemas/schema'
import { getContext } from '../../../getContext'

beforeAll(connectWithMongoose)
afterAll(disconnectWithMongoose)

it('should vote a post', async () => {
  const post = await createPost()
  const user = await createUser()

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

  const result = await graphql({
    schema,
    source: mutation,
    contextValue: await getContext({ user }),
    variableValues: {
      post: post.id,
    },
  })

  expect(result.errors).toBeUndefined()

  // @ts-ignore
  const { post: _post } = result.data?.votePostMutation as any

  expect(_post.title).toBe(post.title)
  expect(_post.body).toBe(post.body)
})
