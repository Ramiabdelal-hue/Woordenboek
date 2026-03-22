import Link from 'next/link'

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Nederlands - Arabisch Woordenboek</h1>
        <p className="hero-subtitle">Leer Nederlands op een eenvoudige en leuke manier</p>
      </div>

      <div className="features-grid">
        <Link href="/words" className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Woorden</h3>
          <p>Bekijk alle opgeslagen woorden</p>
        </Link>

        <Link href="/words/add" className="feature-card">
          <div className="feature-icon">➕</div>
          <h3>Woord toevoegen</h3>
          <p>Voeg nieuwe woorden toe aan het woordenboek</p>
        </Link>

        <Link href="/sentences" className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Zinnen</h3>
          <p>Leer via zinnen en voorbeelden</p>
        </Link>

        <Link href="/quiz" className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Quizzen</h3>
          <p>Test je kennis en voortgang</p>
        </Link>
      </div>
    </div>
  )
}
