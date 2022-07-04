import mongoose from 'mongoose'

export const connectDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI as string

  mongoose.connection.on('close', () => {
    console.log('Database connection was closed!')
  })

  await mongoose.connect(MONGO_URI)
}
