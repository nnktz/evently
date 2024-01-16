import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let cached = (global as any).mongoose || { connect: null, promise: null }

export const connectToDatabase = async () => {
  if (cached.connect) {
    return cached.connect
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing')
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: 'evently',
      bufferCommands: false,
    })

  cached.connect = await cached.promise

  return cached.connect
}
