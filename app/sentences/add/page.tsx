'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function AddSentencePage() {
  const router = useRouter()
  const [words, setWords] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ dutch: '', arabic: '', wordId: '' })

  useEffect(() => {
    fetch('/api/words').then(res => res.json()).then(setWords)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const response = await fetch('/api/sentences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      router.push('/sentences')
    } else {
      const data = await response.json()
      setError(data.error || 'Er is een fout opgetreden')
    }
    setLoading(false)
  }

  return (
    <div className="page-container">
      <NavBar title="➕ Zin toevoegen" backHref="/sentences" backLabel="Zinnen" />
      <div className="page-header">
        <h1 className="page-title">➕ Nieuwe zin</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-banner">⚠️ {error}</div>}
          <div className="form-group">
            <label>🇳🇱 Nederlandse zin</label>
            <textarea required placeholder="Schrijf de zin in het Nederlands..."
              value={formData.dutch}
              onChange={(e) => setFormData({ ...formData, dutch: e.target.value })} />
          </div>
          <div className="form-group">
            <label>🌍 Moedertaal vertaling</label>
            <textarea required placeholder="Schrijf de vertaling in je moedertaal..."
              value={formData.arabic}
              onChange={(e) => setFormData({ ...formData, arabic: e.target.value })} />
          </div>
          <div className="form-group">
            <label>📚 Gekoppeld woord (optioneel)</label>
            <select value={formData.wordId}
              onChange={(e) => setFormData({ ...formData, wordId: e.target.value })}
              className="form-select">
              <option value="">-- Kies een woord --</option>
              {words.map(word => (
                <option key={word.id} value={word.id}>
                  {word.dutch} - {word.arabicMeaning}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Opslaan...' : '✅ Zin opslaan'}
            </button>
            <Link href="/sentences" className="btn btn-secondary">❌ Annuleren</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
