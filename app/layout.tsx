import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'قاموس هولندي - عربي',
  description: 'قاموس تفاعلي للترجمة بين الهولندية والعربية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
