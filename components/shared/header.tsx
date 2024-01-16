import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { Button } from '../ui/button'
import { MobileNav } from './mobile-nav'
import { NavItems } from './nav-items'

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href={'/'} className="w-36">
          <Image src={'/assets/images/logo.svg'} width={128} height={38} alt="Logo" />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button className="rounded-full" size={'lg'} asChild>
              <Link href={'/sign-in'}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}
