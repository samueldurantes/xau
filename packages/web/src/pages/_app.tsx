import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import { ReactRelayContext } from 'react-relay'

import { createEnvironment } from '../relay/environment'
import { AuthProvider } from '../contexts/auth'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const environment = useMemo(() => createEnvironment(), [])

  return (
    <AuthProvider>
      <ReactRelayContext.Provider value={{ environment }}>
        <Component {...pageProps} />
      </ReactRelayContext.Provider>
    </AuthProvider>
  )
}

export default MyApp
