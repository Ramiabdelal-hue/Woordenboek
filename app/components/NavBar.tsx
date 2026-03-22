import Link from 'next/link'

interface NavBarProps {
  title: string
  backHref?: string
  backLabel?: string
}

export default function NavBar({ title, backHref = '/', backLabel = 'Home' }: NavBarProps) {
  return (
    <div className="navbar">
      <Link href="/" className="home-btn" aria-label="Home">
        🏠
      </Link>
      <h2 className="navbar-title">{title}</h2>
      {backHref !== '/' ? (
        <Link href={backHref} className="back-btn">{backLabel} ←</Link>
      ) : (
        <div style={{ width: '80px' }} />
      )}
    </div>
  )
}
