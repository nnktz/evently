'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ICategory } from '@/lib/database/models/category.model'
import { getAllCategories } from '@/actions/category.action'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export const CategoryFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories()

      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories()
  }, [])

  const onSelectCategory = (category: string) => {
    let newUrl = ''

    if (category && category !== 'All') {
      newUrl = formUrlQuery({ params: searchParams.toString(), key: 'category', value: category })
    } else {
      newUrl = removeKeysFromQuery({ params: searchParams.toString(), keysToRemove: ['category'] })
    }

    router.push(newUrl, { scroll: false })
  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>

        {categories.map((category) => (
          <SelectItem key={category._id} value={category.name} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
