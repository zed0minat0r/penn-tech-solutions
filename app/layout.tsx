import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
// ChatBot is now integrated into FloatingCTA
// import ChatBot from '@/components/ChatBot'

export const metadata: Metadata = {
  title: "Penn Tech Solutions | Cloud VoIP & Network Infrastructure for Small Businesses",
  description: 'Affordable cloud-based phone systems and network infrastructure for small businesses in the Greater Philadelphia area. Cut costs with our cloud-first approach.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          {/* ChatBot now integrated into FloatingCTA */}
        </Providers>
      </body>
    </html>
  )
}
