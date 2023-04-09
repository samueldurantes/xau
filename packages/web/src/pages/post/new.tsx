import type { NextPage, GetServerSideProps } from 'next'
import { graphql, useMutation } from 'react-relay'
import { ConnectionHandler, ROOT_ID } from 'relay-runtime'
import { useState } from 'react'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'

import { newMutation } from '../../../__generated__/newMutation.graphql'
import Header from '../../components/Header'

const NewPost: NextPage = ({ isAuthenticated }: any) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const router = useRouter()

  const [commit] = useMutation<newMutation>(
    graphql`
      mutation newMutation($input: PostCreateInput!, $connections: [ID!]!) {
        postCreateMutation(input: $input) {
          postEdge @appendEdge(connections: $connections) {
            cursor
            node {
              title
              body
              author {
                username
              }
            }
          }
        }
      }
    `,
  )

  const handleSubmit = () => {
    const connectionPosts = ConnectionHandler.getConnectionID(
      ROOT_ID,
      'Pages_query_posts',
    )

    const variables = {
      input: {
        title,
        body,
      },
      connections: [connectionPosts],
    }

    commit({
      variables,
      onCompleted() {
        router.push('/')
      },
    })
  }

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-3 w-full sm:w-6/12 flex-col">
        <Header isAuthenticated={isAuthenticated} />

        <div className="bg-orange-50 p-2 flex flex-col">
          <div>
            <p>title:</p>
            <input
              className="w-full border border-black rounded-sm outline-none pl-1"
              type={'text'}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p>body:</p>
            <textarea
              className="w-full h-96 outline-none border border-black rounded-sm resize-none pl-1"
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button
            className="mt-2 mb-2 border border-black rounded-sm"
            onClick={() => handleSubmit()}
          >
            create post
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      isAuthenticated: true,
    },
  }
}

export default NewPost
