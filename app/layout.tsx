import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Game of Selling — Marketing Academy',
  description: 'Level up your marketing skills. Built by Millions Kart for the next generation of performance marketers.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Game of Selling',
    description: 'India\'s no-nonsense marketing academy for D2C brands.',
    url: 'https://gameofselling.com',
    siteName: 'Game of Selling',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'font-medium text-sm',
              duration: 4000,
              style: { borderRadius: '12px', padding: '12px 16px' },
              success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
