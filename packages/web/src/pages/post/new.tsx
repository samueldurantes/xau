import type { NextPage, GetServerSideProps } from 'next'
import { graphql, useMutation } from 'react-relay'
import { useState } from 'react'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { newMutation } from '../../../__generated__/newMutation.graphql'
import Header from '../../components/Header'

const _postMutation = graphql`
  mutation newMutation($title: String!, $body: String!) {
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

const NewPost: NextPage = () => {
  const [commit] = useMutation<newMutation>(_postMutation)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const router = useRouter()

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-3 w-full sm:w-6/12 flex-col">
        <Header>
          <Link href={'/'}>
            <a className="pl-2">recipes</a>
          </Link>
        </Header>

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
            onClick={() => {
              commit({
                variables: {
                  title,
                  body,
                },
                onCompleted() {
                  router.push('/')
                },
              })
            }}
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
    props: {},
  }
}

export default NewPost
