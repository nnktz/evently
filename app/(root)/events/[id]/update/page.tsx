import { auth } from '@clerk/nextjs'

import { getEventById } from '@/actions/event.action'

import { EventForm } from '@/components/shared/event-form'

const UpdateEventPage = async ({ params }: { params: { id: string } }) => {
  const { sessionClaims } = auth()

  const userId = sessionClaims?.userId as string
  const event = await getEventById(params.id)

  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-cover py-5 md:py-10">
      <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Update" event={event} eventId={event._id} />
      </div>
    </section>
  )
}

export default UpdateEventPage
