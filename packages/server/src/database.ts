import mongoose from 'mongoose'

import { config } from './environment'

export const connectDatabase = async () => {
  mongoose.connection.on('close', () => {
    console.log('Database connection was closed!')
  })

  await mongoose.connect(config.MONGO_URI)
}
