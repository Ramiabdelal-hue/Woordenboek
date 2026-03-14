'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SpeakButton from '@/components/SpeakButton'
import NavBar from '@/components/NavBar'

export default function TakeQuizPage() {
  const params = useParams()
  const [quiz, setQuiz] = useState<any>(null)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetch(`/api/quiz/${params.id}`).then(res => res.json()).then(setQuiz)
  }, [params.id])

  const handleSubmit = () => {
    let correct = 0
    quiz.questions.forEach((q: any) => {
      if (answers[q.id] === q.answer) correct++
    })
    setScore(correct)
    setSubmitted(true)
  }

  if (!quiz) return (
    <div className="page-container">
      <div className="loading">⏳ جاري التحميل...</div>
    </div>
  )

  return (
    <div className="page-container">
      <NavBar title={quiz.title} backHref="/quiz" backLabel="الامتحانات" />
      <div className="page-header">
        <h1 className="page-title">🎯 {quiz.title}</h1>
        {quiz.description && <p className="hero-subtitle">{quiz.description}</p>}
      </div>

      <div className="words-container">
        {!submitted ? (
          <>
            <div className="word-list">
              {quiz.questions.map((q: any, index: number) => (
                <div key={q.id} className="word-card">
                  <div className="word-header">
                    <h3 className="word-dutch">السؤال {index + 1}</h3>
                    <SpeakButton text={q.question} lang="nl-NL" />
                  </div>
                  <p className="word-arabic" style={{ marginBottom: '15px' }}>{q.question}</p>

                  <div className="options-list">
                    {q.options.map((option: string, oIndex: number) => (
                      <label key={oIndex} className={`option-label ${answers[q.id] === option ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name={q.id}
                          value={option}
                          onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleSubmit} className="btn btn-primary submit-btn">
              ✅ إرسال الإجابات
            </button>
          </>
        ) : (
          <>
            <div className="score-card">
              <div className="score-number">{score}/{quiz.questions.length}</div>
              <div className="score-emoji">
                {score === quiz.questions.length ? '🎉 ممتاز!' : score >= quiz.questions.length / 2 ? '👍 جيد!' : '💪 حاول مرة أخرى!'}
              </div>
            </div>

            <div className="word-list">
              {quiz.questions.map((q: any, index: number) => (
                <div key={q.id} className={`word-card ${answers[q.id] === q.answer ? 'correct' : 'wrong'}`}>
                  <h3 className="word-dutch">السؤال {index + 1}</h3>
                  <p className="word-arabic">{q.question}</p>
                  <p className="word-other">
                    <span className="label">إجابتك:</span> {answers[q.id] || 'لم تجب'}
                  </p>
                  <p className="word-other">
                    <span className="label">الصحيحة:</span> {q.answer}
                  </p>
                  <span className={`result-badge ${answers[q.id] === q.answer ? 'correct' : 'wrong'}`}>
                    {answers[q.id] === q.answer ? '✓ صحيح' : '✗ خطأ'}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/quiz" className="btn btn-primary submit-btn">
              🔄 امتحان آخر
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
