'use server'

import Category from '@/lib/database/models/category.model'
import { connectToDatabase } from '@/lib/database'
import { handleError } from '@/lib/utils'
import { CreateCategoryParams } from '@/types'

export const getCategoryByName = (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

export const getAllCategories = async () => {
  try {
    await connectToDatabase()

    const categories = await Category.find()

    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    handleError(error)
  }
}

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    await connectToDatabase()

    const newCategory = await Category.create({ name: categoryName })

    return JSON.parse(JSON.stringify(newCategory))
  } catch (error) {
    handleError(error)
  }
}
