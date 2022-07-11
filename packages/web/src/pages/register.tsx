import type { NextPage, GetServerSideProps } from 'next'
import { useState, useContext } from 'react'
import { graphql, useMutation } from 'react-relay'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

import {
  registerMutation,
  registerMutation$data,
} from '../../__generated__/registerMutation.graphql'
import { AuthContext } from '../contexts/auth'

const _registerMutation = graphql`
  mutation registerMutation($username: String!, $password: String!) {
    userRegisterMutation(input: { username: $username, password: $password }) {
      token
      me {
        id
        username
      }
    }
  }
`

const Register: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [commit] = useMutation<registerMutation>(_registerMutation)
  const { logIn } = useContext(AuthContext)
  const router = useRouter()

  return (
    <div className="ml-2">
      <div className="mt-8">
        <h1 className="mb-2 text-lg">Create Account</h1>
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
              onCompleted({ userRegisterMutation }: registerMutation$data) {
                const token = userRegisterMutation?.token ?? ''

                logIn(token)

                router.push('/')
              },
            })
          }}
        >
          create account
        </button>
      </div>
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

export default Register
