'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function EditSentencePage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [words, setWords] = useState<any[]>([])
  const [formData, setFormData] = useState({
    dutch: '', arabic: '', wordId: ''
  })

  useEffect(() => {
    fetch('/api/words').then(r => r.json()).then(setWords)
    fetch(`/api/sentences/${params.id}`)
      .then(r => r.json())
      .then(data => setFormData({
        dutch: data.dutch,
        arabic: data.arabic,
        wordId: data.wordId
      }))
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(`/api/sentences/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) router.push('/sentences')
    setLoading(false)
  }

  return (
    <div className="page-container">
      <NavBar title="✏️ تعديل جملة" backHref="/sentences" backLabel="الجمل" />
      <div className="page-header">
        <h1 className="page-title">✏️ تعديل الجملة</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>🇳🇱 الجملة بالهولندية</label>
            <textarea
              required
              value={formData.dutch}
              onChange={(e) => setFormData({ ...formData, dutch: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>🇸🇦 الترجمة بالعربية</label>
            <textarea
              required
              value={formData.arabic}
              onChange={(e) => setFormData({ ...formData, arabic: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>📚 الكلمة المرتبطة</label>
            <select
              required
              value={formData.wordId}
              onChange={(e) => setFormData({ ...formData, wordId: e.target.value })}
              className="form-select"
            >
              <option value="">-- اختر كلمة --</option>
              {words.map(w => (
                <option key={w.id} value={w.id}>{w.dutch} - {w.arabicMeaning}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ جاري الحفظ...' : '✅ حفظ التعديلات'}
            </button>
            <Link href="/sentences" className="btn btn-secondary">❌ إلغاء</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
