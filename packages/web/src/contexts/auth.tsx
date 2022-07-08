import { createContext, useState, useEffect } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { verify } from 'jsonwebtoken'

type AuthContextType = {
  isAuthenticated: boolean
  logIn: (token: string) => void
  logOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const { 'auth.token': token } = parseCookies()

    if (token) {
      const tokenVerified = verify(
        token.substring(4),
        process.env.NEXT_PUBLIC_JWT_SECRET as string,
      )

      if (tokenVerified) {
        setIsAuthenticated(true)
      } else {
        destroyCookie(undefined, 'auth.token')
      }
    }
  }, [])

  const logIn = (token: string) => {
    setCookie(undefined, 'auth.token', token, {
      maxAge: 60 * 60 * 24, // 24 hours
    })
    setIsAuthenticated(true)
  }

  const logOut = () => {
    destroyCookie(undefined, 'auth.token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
