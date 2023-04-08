import type { NextPage, GetServerSideProps } from 'next'
import { useContext, useState } from 'react'
import { graphql, useMutation } from 'react-relay'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import Link from 'next/link'

import {
  loginMutation,
  loginMutation$data,
} from '../../__generated__/loginMutation.graphql'
import { AuthContext } from '../contexts/auth'

const _loginMutation = graphql`
  mutation loginMutation($username: String!, $password: String!) {
    userLoginMutation(input: { username: $username, password: $password }) {
      token
      me {
        id
        username
      }
    }
  }
`

const Login: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [commit] = useMutation<loginMutation>(_loginMutation)
  const { logIn } = useContext(AuthContext)
  const router = useRouter()

  return (
    <div className="ml-2">
      <div className="mt-8">
        <h1 className="mb-2 text-lg">Login</h1>
        <div>
          <p>username:</p>
          <input
            className="border border-black rounded-sm outline-none pl-1"
            type={'text'}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>password:</p>
          <input
            className="border border-black rounded-sm outline-none pl-1"
            type={'password'}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="mt-2 mb-2 border border-black rounded-sm"
          onClick={() => {
            commit({
              variables: {
                username,
                password,
              },
              onCompleted({ userLoginMutation }: loginMutation$data) {
                const token = userLoginMutation?.token ?? ''

                logIn(token)

                router.push('/')
              },
            })
          }}
        >
          login
        </button>
      </div>

      <Link href={'/register'}>
        <a className="hover:underline">create a account</a>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth.token': token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Login
