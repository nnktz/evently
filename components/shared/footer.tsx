import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex-between flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href={'/'}>
          <Image src={'/assets/images/logo.svg'} alt="Logo" width={128} height={38} />
        </Link>

        <p>{new Date().getFullYear()} Evently. All Rights reserved.</p>
      </div>
    </footer>
  )
}
