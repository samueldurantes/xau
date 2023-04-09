import type { NextPage, GetServerSideProps } from 'next'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

import { AuthContext } from '../contexts/auth'

const LogOut: NextPage = () => {
  const { logOut } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      logOut()

      router.push('/')
    }, 500)
  })

  return (
    <div className="h-screen flex items-center justify-center">
      <h1>Logging out...</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth.token': token } = parseCookies(ctx)

  if (!token) {
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

export default LogOut
