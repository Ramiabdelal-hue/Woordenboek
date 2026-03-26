'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function AddWordPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ dutch: '', arabicMeaning: '', otherMeaning: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const response = await fetch('/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      router.push('/words')
    } else {
      const data = await response.json()
      setError(data.error || 'Er is een fout opgetreden')
    }
    setLoading(false)
  }

  return (
    <div className="page-container">
      <NavBar title="➕ Woord toevoegen" backHref="/words" backLabel="Woorden" />
      <div className="page-header">
        <h1 className="page-title">➕ Nieuw woord</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-banner">⚠️ {error}</div>}
          <div className="form-group">
            <label>🇳🇱 Nederlands woord</label>
            <input type="text" required placeholder="bijv. huis"
              value={formData.dutch}
              onChange={(e) => setFormData({ ...formData, dutch: e.target.value })} />
          </div>
          <div className="form-group">
            <label>🌍 Moedertaal betekenis</label>
            <input type="text" required placeholder="bijv. بيت"
              value={formData.arabicMeaning}
              onChange={(e) => setFormData({ ...formData, arabicMeaning: e.target.value })} />
          </div>
          <div className="form-group">
            <label>📝 Extra betekenis (optioneel)</label>
            <input type="text" placeholder="Extra betekenis of notities"
              value={formData.otherMeaning}
              onChange={(e) => setFormData({ ...formData, otherMeaning: e.target.value })} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Opslaan...' : '✅ Woord opslaan'}
            </button>
            <Link href="/words" className="btn btn-secondary">❌ Annuleren</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
