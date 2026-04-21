import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { EnquiryProvider } from '@/context/EnquiryContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Ramdas Yadav Associates | Professional Corporate Consulting',
  description: 'Expert tax, audit, and consulting services tailored for businesses and individuals aiming for global excellence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800;900&display=swap" rel="stylesheet" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-on-background selection:bg-primary-container selection:text-on-primary-fixed`}>
        <EnquiryProvider>
          {children}
        </EnquiryProvider>
      </body>
    </html>
  )
}
