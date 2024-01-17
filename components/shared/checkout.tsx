import { IEvent } from '@/lib/database/models/event.model'

import { Button } from '../ui/button'

interface CheckoutProps {
  event: IEvent
  userId: string
}

export const Checkout = ({ event, userId }: CheckoutProps) => {
  const onCheckout = () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    }
  }

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size={'lg'} className="button sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  )
}
