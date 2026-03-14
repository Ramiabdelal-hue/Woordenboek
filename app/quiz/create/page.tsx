'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function CreateQuizPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState({ title: '', description: '' })
  const [questions, setQuestions] = useState([
    { question: '', answer: '', options: ['', '', '', ''] }
  ])

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '', options: ['', '', '', ''] }])
  }

  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...questions]
    updated[index] = { ...updated[index], [field]: value }
    setQuestions(updated)
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions]
    updated[qIndex].options[oIndex] = value
    setQuestions(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz, questions })
    })
    if (response.ok) router.push('/quiz')
    setLoading(false)
  }

  return (
    <div className="page-container">
      <NavBar title="➕ إنشاء امتحان" backHref="/quiz" backLabel="الامتحانات" />
      <div className="page-header">
        <h1 className="page-title">➕ إنشاء امتحان جديد</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>📝 عنوان الامتحان</label>
            <input
              type="text"
              required
              placeholder="مثال: امتحان الكلمات الأساسية"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>📄 الوصف (اختياري)</label>
            <textarea
              placeholder="وصف الامتحان..."
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </div>

          <div className="questions-section">
            <h3 className="section-title">الأسئلة</h3>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="question-card">
                <div className="question-number">السؤال {qIndex + 1}</div>

                <div className="form-group">
                  <label>السؤال</label>
                  <input
                    type="text"
                    required
                    placeholder="اكتب السؤال..."
                    value={q.question}
                    onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>✅ الإجابة الصحيحة</label>
                  <input
                    type="text"
                    required
                    placeholder="الإجابة الصحيحة..."
                    value={q.answer}
                    onChange={(e) => updateQuestion(qIndex, 'answer', e.target.value)}
                  />
                </div>

                <label className="options-label">الخيارات</label>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="form-group">
                    <input
                      type="text"
                      required
                      placeholder={`الخيار ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" onClick={addQuestion} className="btn btn-secondary">
              ➕ إضافة سؤال
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ جاري الحفظ...' : '✅ حفظ الامتحان'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
