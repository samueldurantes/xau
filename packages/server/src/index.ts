import { createServer } from 'http'

import app from './app'

const server = createServer(app.callback())

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
