'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function AddSentencePage() {
  const router = useRouter()
  const [words, setWords] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ dutch: '', arabic: '', wordId: '' })

  useEffect(() => {
    fetch('/api/words').then(res => res.json()).then(setWords)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/sentences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (response.ok) router.push('/sentences')
    setLoading(false)
  }

  return (
    <div className="page-container">
      <NavBar title="➕ إضافة جملة" backHref="/sentences" backLabel="الجمل" />
      <div className="page-header">
        <h1 className="page-title">➕ إضافة جملة جديدة</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>🇳🇱 الجملة بالهولندية</label>
            <textarea
              required
              placeholder="اكتب الجملة بالهولندية..."
              value={formData.dutch}
              onChange={(e) => setFormData({ ...formData, dutch: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>🇸🇦 الترجمة بالعربية</label>
            <textarea
              required
              placeholder="اكتب الترجمة بالعربية..."
              value={formData.arabic}
              onChange={(e) => setFormData({ ...formData, arabic: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>📚 الكلمة المرتبطة (اختياري)</label>
            <select
              value={formData.wordId}
              onChange={(e) => setFormData({ ...formData, wordId: e.target.value })}
              className="form-select"
            >
              <option value="">-- اختر كلمة --</option>
              {words.map(word => (
                <option key={word.id} value={word.id}>
                  {word.dutch} - {word.arabicMeaning}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ جاري الحفظ...' : '✅ حفظ الجملة'}
            </button>
            <Link href="/sentences" className="btn btn-secondary">❌ إلغاء</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
