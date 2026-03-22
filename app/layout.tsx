import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegister from './components/ServiceWorkerRegister'

export const metadata: Metadata = {
  title: 'Nederlands - Arabisch Woordenboek',
  description: 'Interactief woordenboek voor vertaling tussen Nederlands en Arabisch',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Woordenboek',
  },
  icons: {
    apple: '/icons/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#667eea',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  )
}
