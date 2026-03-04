'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateQuizPage() {
  const router = useRouter()
  const [quiz, setQuiz] = useState({
    title: '',
    description: ''
  })
  const [questions, setQuestions] = useState([
    { question: '', answer: '', options: ['', '', '', ''] }
  ])

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '', options: ['', '', '', ''] }])
  }

  const updateQuestion = (index: number, field: string, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setQuestions(newQuestions)
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].options[oIndex] = value
    setQuestions(newQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz, questions })
    })

    if (response.ok) {
      router.push('/quiz')
    }
  }

  return (
    <div className="container">
      <h1 className="header">إنشاء امتحان جديد</h1>
      <nav className="nav">
        <Link href="/">الرئيسية</Link>
        <Link href="/quiz">قائمة الامتحانات</Link>
      </nav>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>عنوان الامتحان:</label>
          <input
            type="text"
            required
            value={quiz.title}
            onChange={(e) => setQuiz({...quiz, title: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>الوصف (اختياري):</label>
          <textarea
            rows={2}
            value={quiz.description}
            onChange={(e) => setQuiz({...quiz, description: e.target.value})}
          />
        </div>

        <h2 style={{ marginTop: '30px', marginBottom: '20px' }}>الأسئلة</h2>
        
        {questions.map((q, qIndex) => (
          <div key={qIndex} style={{ border: '2px solid #ddd', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
            <h3>السؤال {qIndex + 1}</h3>
            
            <div className="form-group">
              <label>السؤال:</label>
              <input
                type="text"
                required
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>الإجابة الصحيحة:</label>
              <input
                type="text"
                required
                value={q.answer}
                onChange={(e) => updateQuestion(qIndex, 'answer', e.target.value)}
              />
            </div>

            <label>الخيارات:</label>
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

        <button type="button" onClick={addQuestion} className="btn" style={{ marginLeft: '10px' }}>
          إضافة سؤال
        </button>
        <button type="submit" className="btn">حفظ الامتحان</button>
      </form>
    </div>
  )
}
