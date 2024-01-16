import Image from 'next/image'

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Separator } from '../ui/separator'
import { NavItems } from './nav-items'

export const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src={'/assets/icons/menu.svg'}
            alt="Menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />

          <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
            <Image src={'/assets/images/logo.svg'} alt="Logo" width={128} height={38} />

            <Separator className="border border-gray-50" />

            <NavItems />
          </SheetContent>
        </SheetTrigger>
      </Sheet>
    </nav>
  )
}
