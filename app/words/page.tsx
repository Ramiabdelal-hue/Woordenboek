'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SpeakButton from '@/components/SpeakButton'
import NavBar from '@/components/NavBar'

interface Word {
  id: string
  dutch: string
  arabicMeaning: string
  otherMeaning: string | null
}

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchWords() }, [])

  const fetchWords = async () => {
    const response = await fetch('/api/words')
    const data = await response.json()
    setWords(data)
    setLoading(false)
  }

  const filteredWords = words.filter(word =>
    word.dutch.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-container">
      <NavBar title="📚 Woorden" />
      <div className="page-header">
        <h1 className="page-title">📚 Woordenlijst</h1>
      </div>

      <div className="words-container">
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Zoek een woord..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
            )}
          </div>
          <Link href="/words/add" className="btn btn-primary">
            ➕ Nieuw woord
          </Link>
        </div>

        {loading ? (
          <div className="loading">⏳ Laden...</div>
        ) : (
          <>
            <div className="results-count">{filteredWords.length} woorden</div>
            <div className="word-list">
              {filteredWords.length === 0 ? (
                <div className="no-results">
                  <p>😕 Geen resultaten voor "{searchTerm}"</p>
                </div>
              ) : (
                filteredWords.map((word) => (
                  <div key={word.id} className="word-card">
                    <div className="word-header">
                      <h3 className="word-dutch">{word.dutch}</h3>
                      <div className="card-actions">
                        <Link href={`/words/edit/${word.id}`} className="btn-edit">✏️</Link>
                        <SpeakButton text={word.dutch} lang="nl-NL" />
                      </div>
                    </div>
                    <div className="word-content">
                      <p className="word-arabic">
                        <span className="label">🇸🇦 Arabisch:</span>
                        {word.arabicMeaning}
                      </p>
                      {word.otherMeaning && (
                        <p className="word-other">
                          <span className="label">📝 Notities:</span>
                          {word.otherMeaning}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
