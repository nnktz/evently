'use client'

import { loadStripe } from '@stripe/stripe-js'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { IEvent } from '@/lib/database/models/event.model'
import { checkoutOrder } from '@/actions/order.action'

import { Button } from '../ui/button'

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutProps {
  event: IEvent
  userId: string
}

export const Checkout = ({ event, userId }: CheckoutProps) => {
  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    }

    await checkoutOrder(order)
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      toast.success('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      toast("Order cancelled -- continue to shop around and checkout when you're ready.")
    }
  }, [])

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size={'lg'} className="button sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  )
}
