'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function EditWordPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ dutch: '', arabicMeaning: '', otherMeaning: '' })

  useEffect(() => {
    fetch(`/api/words/${params.id}`).then(res => res.json())
      .then(data => setFormData({
        dutch: data.dutch,
        arabicMeaning: data.arabicMeaning,
        otherMeaning: data.otherMeaning || ''
      }))
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch(`/api/words/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      router.push('/words')
    } else {
      const data = await res.json()
      setError(data.error || 'Er is een fout opgetreden')
    }
    setLoading(false)
  }

  return (
    <div className="page-container">
      <NavBar title="✏️ Woord bewerken" backHref="/words" backLabel="Woorden" />
      <div className="page-header">
        <h1 className="page-title">✏️ Woord bewerken</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-banner">⚠️ {error}</div>}
          <div className="form-group">
            <label>🇳🇱 Nederlands woord</label>
            <input type="text" required value={formData.dutch}
              onChange={(e) => setFormData({ ...formData, dutch: e.target.value })} />
          </div>
          <div className="form-group">
            <label>🇸🇦 Arabische betekenis</label>
            <input type="text" required value={formData.arabicMeaning}
              onChange={(e) => setFormData({ ...formData, arabicMeaning: e.target.value })} />
          </div>
          <div className="form-group">
            <label>📝 Extra betekenis (optioneel)</label>
            <input type="text" value={formData.otherMeaning}
              onChange={(e) => setFormData({ ...formData, otherMeaning: e.target.value })} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Opslaan...' : '✅ Wijzigingen opslaan'}
            </button>
            <Link href="/words" className="btn btn-secondary">❌ Annuleren</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
