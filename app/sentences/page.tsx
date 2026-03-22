'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import SpeakButton from '@/components/SpeakButton'
import NavBar from '@/components/NavBar'

export default function SentencesPage() {
  const [sentences, setSentences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSentences = useCallback(async () => {
    const res = await fetch('/api/sentences')
    const data = await res.json()
    setSentences(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchSentences() }, [fetchSentences])

  const handleDelete = async (id: string) => {
    if (!confirm('Deze zin verwijderen?')) return
    await fetch(`/api/sentences/${id}`, { method: 'DELETE' })
    setSentences(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="page-container">
      <NavBar title="💬 Zinnen" />
      <div className="page-header">
        <h1 className="page-title">💬 Zinnenlijst</h1>
      </div>

      <div className="words-container">
        <div className="search-section">
          <Link href="/sentences/add" className="btn btn-primary">
            ➕ Nieuwe zin
          </Link>
        </div>

        {loading ? (
          <div className="loading">⏳ Laden...</div>
        ) : (
          <div className="word-list">
            {sentences.length === 0 ? (
              <div className="no-results">😕 Nog geen zinnen</div>
            ) : (
              sentences.map((sentence) => (
                <div key={sentence.id} className="word-card">
                  <div className="word-header">
                    <h3 className="word-dutch">{sentence.dutch}</h3>
                    <div className="card-actions">
                      <Link href={`/sentences/edit/${sentence.id}`} className="btn-edit">✏️</Link>
                      <button className="btn-delete" onClick={() => handleDelete(sentence.id)}>🗑️</button>
                      <SpeakButton text={sentence.dutch} lang="nl-NL" />
                    </div>
                  </div>
                  <div className="word-content">
                    <p className="word-arabic">
                      <span className="label">🇸🇦 Vertaling:</span>
                      {sentence.arabic}
                    </p>
                    <p className="word-other">
                      <span className="label">📚 Woord:</span>
                      {sentence.word?.dutch ?? '—'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
