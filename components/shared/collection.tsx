import { IEvent } from '@/lib/database/models/event.model'

import { Card } from './card'
import { Pagination } from './pagination'

interface CollectionProps {
  data: IEvent[]
  emptyTitle: string
  emptyStateSubText: string
  limit: number
  page: number | string
  totalPages?: number
  urlParamName?: string
  collectionType?: 'Event_Organized' | 'My_Tickets' | 'All_Events'
}

export const Collection = ({
  data,
  emptyTitle,
  emptyStateSubText,
  limit,
  page,
  totalPages = 0,
  urlParamName,
  collectionType,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Event_Organized'
              const hidePrice = collectionType === 'My_Tickets'

              return (
                <li key={event._id} className="flex justify-center">
                  <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} urlParamName={urlParamName} />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubText}</p>
        </div>
      )}
    </>
  )
}
