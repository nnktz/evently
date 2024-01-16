import { Footer } from '@/components/shared/footer'
import { Header } from '@/components/shared/header'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default RootLayout
