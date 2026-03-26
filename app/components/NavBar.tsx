'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

interface NavBarProps {
  title: string
  backHref?: string
  backLabel?: string
}

export default function NavBar({ title, backHref = '/', backLabel = 'Home' }: NavBarProps) {
  const { data: session } = useSession()

  return (
    <div className="navbar">
      <Link href="/" className="home-btn" aria-label="Home">🏠</Link>
      <h2 className="navbar-title">{title}</h2>
      {backHref !== '/' ? (
        <Link href={backHref} className="back-btn">{backLabel} ←</Link>
      ) : session ? (
        <button className="back-btn" onClick={() => signOut({ callbackUrl: '/login' })}>
          🚪 {session.user?.name}
        </button>
      ) : (
        <div style={{ width: '80px' }} />
      )}
    </div>
  )
}
