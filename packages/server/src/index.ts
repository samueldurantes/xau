import { createServer } from 'http'

import app from './app'
import { connectDatabase } from './database'
import { config } from './environment'

const f = async () => {
  await connectDatabase()

  const server = createServer(app.callback())

  server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
  })
}

f()
