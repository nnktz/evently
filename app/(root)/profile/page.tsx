import Link from 'next/link'
import { auth } from '@clerk/nextjs'

import { getEventsByUser } from '@/actions/event.action'
import { getOrdersByUser } from '@/actions/order.action'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'

import { Button } from '@/components/ui/button'
import { Collection } from '@/components/shared/collection'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth()

  const userId = sessionClaims?.userId as string

  const ordersPage = Number(searchParams?.ordersPage) || 1
  const eventsPage = Number(searchParams?.eventsPage) || 1

  const orders = await getOrdersByUser({ userId, page: ordersPage })
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button size={'lg'} className="button hidden sm:flex" asChild>
            <Link href={'/events'}>Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubText="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={orderedEvents}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button size={'lg'} className="button hidden sm:flex" asChild>
            <Link href={'/events/create'}>Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubText="Go create some now"
          collectionType="Event_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage
