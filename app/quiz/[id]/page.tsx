'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SpeakButton from '@/components/SpeakButton'

export const dynamic = 'force-dynamic'

export default function TakeQuizPage() {
  const params = useParams()
  const [quiz, setQuiz] = useState<any>(null)
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetch(`/api/quiz/${params.id}`)
      .then(res => res.json())
      .then(data => setQuiz(data))
  }, [params.id])

  const handleSubmit = () => {
    let correct = 0
    quiz.questions.forEach((q: any) => {
      if (answers[q.id] === q.answer) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
  }

  if (!quiz) return <div className="container">جاري التحميل...</div>

  return (
    <div className="container">
      <h1 className="header">{quiz.title}</h1>
      {quiz.description && <p style={{ textAlign: 'center', marginBottom: '20px' }}>{quiz.description}</p>}
      
      <nav className="nav">
        <Link href="/">الرئيسية</Link>
        <Link href="/quiz">قائمة الامتحانات</Link>
      </nav>

      {!submitted ? (
        <div>
          {quiz.questions.map((q: any, index: number) => (
            <div key={q.id} className="word-item">
              <h3>السؤال {index + 1}: {q.question}</h3>
              <SpeakButton text={q.question} lang="nl-NL" />
              
              <div style={{ marginTop: '15px' }}>
                {q.options.map((option: string, oIndex: number) => (
                  <div key={oIndex} style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name={q.id}
                        value={option}
                        onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                        style={{ marginLeft: '10px' }}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <button onClick={handleSubmit} className="btn" style={{ marginTop: '20px' }}>
            إرسال الإجابات
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h2>النتيجة: {score} من {quiz.questions.length}</h2>
          <p style={{ fontSize: '24px', marginTop: '20px' }}>
            {score === quiz.questions.length ? '🎉 ممتاز!' : score >= quiz.questions.length / 2 ? '👍 جيد!' : '💪 حاول مرة أخرى!'}
          </p>
          
          <div style={{ marginTop: '30px' }}>
            {quiz.questions.map((q: any, index: number) => (
              <div key={q.id} className="word-item">
                <h3>السؤال {index + 1}: {q.question}</h3>
                <p><strong>إجابتك:</strong> {answers[q.id] || 'لم تجب'}</p>
                <p><strong>الإجابة الصحيحة:</strong> {q.answer}</p>
                <p style={{ color: answers[q.id] === q.answer ? 'green' : 'red' }}>
                  {answers[q.id] === q.answer ? '✓ صحيح' : '✗ خطأ'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
