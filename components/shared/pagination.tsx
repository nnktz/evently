'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { formUrlQuery } from '@/lib/utils'

import { Button } from '../ui/button'

interface PaginationProps {
  page: number | string
  totalPages: number
  urlParamName?: string
}

export const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex gap-2">
      <Button
        disabled={Number(page) <= 1}
        size={'lg'}
        variant={'outline'}
        className="w-28"
        onClick={() => onClick('prev')}
      >
        Previous
      </Button>

      <Button
        disabled={Number(page) >= totalPages}
        size={'lg'}
        variant={'outline'}
        className="w-28"
        onClick={() => onClick('next')}
      >
        Next
      </Button>
    </div>
  )
}
