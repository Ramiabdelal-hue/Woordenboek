'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddSentencePage() {
  const router = useRouter()
  const [words, setWords] = useState<any[]>([])
  const [formData, setFormData] = useState({
    dutch: '',
    arabic: '',
    wordId: ''
  })

  useEffect(() => {
    fetch('/api/words')
      .then(res => res.json())
      .then(data => setWords(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await fetch('/api/sentences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      router.push('/sentences')
    }
  }

  return (
    <div className="container">
      <h1 className="header">إضافة جملة جديدة</h1>
      <nav className="nav">
        <Link href="/">الرئيسية</Link>
        <Link href="/sentences">قائمة الجمل</Link>
      </nav>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>الجملة بالهولندية:</label>
          <textarea
            required
            rows={3}
            value={formData.dutch}
            onChange={(e) => setFormData({...formData, dutch: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>الترجمة بالعربية:</label>
          <textarea
            required
            rows={3}
            value={formData.arabic}
            onChange={(e) => setFormData({...formData, arabic: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>اختر الكلمة المرتبطة:</label>
          <select
            required
            value={formData.wordId}
            onChange={(e) => setFormData({...formData, wordId: e.target.value})}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          >
            <option value="">-- اختر كلمة --</option>
            {words.map(word => (
              <option key={word.id} value={word.id}>
                {word.dutch} - {word.arabicMeaning}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn">حفظ الجملة</button>
      </form>
    </div>
  )
}
