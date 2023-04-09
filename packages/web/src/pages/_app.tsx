import type { AppProps } from 'next/app'
import { Suspense } from 'react'

import { ReactRelayContainer } from '../relay/ReactRelayContainer'
import { AuthProvider } from '../contexts/auth'

import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Suspense fallback="loading">
        <ReactRelayContainer Component={Component} props={pageProps} />
      </Suspense>
    </AuthProvider>
  )
}

export default App
