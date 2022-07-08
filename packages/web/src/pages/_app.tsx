import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import { ReactRelayContext } from 'react-relay'

import { createEnvironment } from '../relay/environment'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const environment = useMemo(() => createEnvironment(), [])

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      <Component {...pageProps} />
    </ReactRelayContext.Provider>
  )
}

export default MyApp
