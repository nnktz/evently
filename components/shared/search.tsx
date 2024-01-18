'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

import { Input } from '../ui/input'

export const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = ''

      if (query) {
        newUrl = formUrlQuery({ params: searchParams.toString(), key: 'query', value: query })
      } else {
        newUrl = removeKeysFromQuery({ params: searchParams.toString(), keysToRemove: ['query'] })
      }
      router.push(newUrl, { scroll: false })
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query, searchParams, router])

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image src={'/assets/icons/search.svg'} alt="Search" width={24} height={24} />

      <Input
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
