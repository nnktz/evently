'use server'

import { revalidatePath } from 'next/cache'

import User from '@/lib/database/models/user.model'
import { connectToDatabase } from '@/lib/database'
import { handleError } from '@/lib/utils'
import { CreateUserParams, UpdateUserParams } from '@/types'

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase()

    const newUser = await User.create(user)

    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) {
      throw new Error('User update failed')
    }

    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase()

    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // TODO: unlink relationships

    const deletedUser = await User.findByIdAndDelete(userToDelete._id)

    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}
