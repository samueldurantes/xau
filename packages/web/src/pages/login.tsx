import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import { graphql, useMutation } from 'react-relay'
import Link from 'next/link'
import Router from 'next/router'

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
  const { isAuthenticated, logIn } = useContext(AuthContext)

  if (isAuthenticated) {
    Router.push('/')
  }

  return (
    <div className="ml-2">
      <div className="mt-8">
        <h1 className="mb-2 text-lg">Login</h1>
        <div>
          <p>username:</p>
          <input
            className="border border-black rounded-sm"
            type={'text'}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>password:</p>
          <input
            className="border border-black rounded-sm"
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

                Router.push('/')
              },
            })
          }}
        >
          login
        </button>
      </div>

      <Link href={'/register'}>
        <a>create a account</a>
      </Link>
    </div>
  )
}

export default Login
