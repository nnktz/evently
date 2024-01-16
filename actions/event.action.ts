import { DeleteEventParams, GetEventsByUserParams, UpdateEventParams } from './../types/index'
;('use server')

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Event from '@/lib/database/models/event.model'
import User from '@/lib/database/models/user.model'
import { handleError } from '@/lib/utils'
import { CreateEventParams } from '@/types'

const populateEvent = (query: any) => {
  return query.populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
}

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase()

    const event = await populateEvent(Event.findById(eventId))

    if (!event) {
      throw new Error('Event not found')
    }

    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}

export const createEvent = async ({ userId, event, path }: CreateEventParams) => {
  try {
    await connectToDatabase()

    const organizer = await User.findById(userId)

    if (!organizer) {
      throw new Error('Organizer not found')
    }

    const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}

export const updateEvent = async ({ userId, event, path }: UpdateEventParams) => {
  try {
    await connectToDatabase()

    const eventToUpdate = await Event.findById(event._id)

    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updateEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true },
    )

    revalidatePath(path)

    return JSON.parse(JSON.stringify(updateEvent))
  } catch (error) {
    handleError(error)
  }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDatabase()

    const deletedEvent = await Event.findByIdAndDelete(eventId)

    if (deletedEvent) {
      revalidatePath(path)
    }
  } catch (error) {
    handleError(error)
  }
}

export const getEventsByUser = async ({ userId, limit = 6, page }: GetEventsByUserParams) => {
  try {
    await connectToDatabase()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
