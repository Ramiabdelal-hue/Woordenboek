'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function AddWordPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    dutch: '',
    arabicMeaning: '',
    otherMeaning: ''
  })
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
      setError(data.error || 'حدث خطأ، حاول مرة أخرى')
    }
    setLoading(false)
  }

  return (
    <div className="page-container">
      <NavBar title="➕ إضافة كلمة" backHref="/words" backLabel="الكلمات" />
      <div className="page-header">
        <h1 className="page-title">➕ إضافة كلمة جديدة</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-banner">⚠️ {error}</div>}
          <div className="form-group">
            <label>🇳🇱 الكلمة بالهولندية</label>
            <input
              type="text"
              required
              placeholder="مثال: huis"
              value={formData.dutch}
              onChange={(e) => setFormData({...formData, dutch: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>🇸🇦 المعنى بالعربية</label>
            <input
              type="text"
              required
              placeholder="مثال: بيت"
              value={formData.arabicMeaning}
              onChange={(e) => setFormData({...formData, arabicMeaning: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>📝 معنى آخر (اختياري)</label>
            <input
              type="text"
              placeholder="معنى إضافي أو ملاحظات"
              value={formData.otherMeaning}
              onChange={(e) => setFormData({...formData, otherMeaning: e.target.value})}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ جاري الحفظ...' : '✅ حفظ الكلمة'}
            </button>
            <Link href="/words" className="btn btn-secondary">
              ❌ إلغاء
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
