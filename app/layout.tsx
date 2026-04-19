import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Dra. Cecília António - Solicitadora',
  description: 'Solicitadora. A sua missão é solucionar de forma eficaz e personalizada.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-pt" className="scroll-smooth">
      <body className={`${inter.className} ${playfair.variable} ${inter.variable}`}>{children}</body>
    </html>
  )
}
