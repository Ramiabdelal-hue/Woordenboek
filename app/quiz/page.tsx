import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export const dynamic = 'force-dynamic'

export default async function QuizPage() {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="page-container">
      <NavBar title="🎯 Quizzen" />
      <div className="page-header">
        <h1 className="page-title">🎯 Quizzen</h1>
      </div>

      <div className="words-container">
        <div className="search-section">
          <Link href="/quiz/create" className="btn btn-primary">
            ➕ Nieuwe quiz
          </Link>
        </div>

        <div className="word-list">
          {quizzes.length === 0 ? (
            <div className="no-results">😕 Nog geen quizzen</div>
          ) : (
            quizzes.map((quiz) => (
              <div key={quiz.id} className="word-card">
                <div className="word-header">
                  <h3 className="word-dutch">{quiz.title}</h3>
                  <span className="quiz-count">{quiz.questions.length} vragen</span>
                </div>
                <div className="word-content">
                  {quiz.description && (
                    <p className="word-arabic">{quiz.description}</p>
                  )}
                  <Link href={`/quiz/${quiz.id}`} className="btn btn-primary" style={{ marginTop: '10px', display: 'inline-block' }}>
                    🚀 Quiz starten
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
