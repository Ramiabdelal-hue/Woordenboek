import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function QuizPage() {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container">
      <h1 className="header">الامتحانات</h1>
      <nav className="nav">
        <Link href="/">الرئيسية</Link>
        <Link href="/quiz/create">إنشاء امتحان جديد</Link>
      </nav>
      
      <div className="word-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="word-item">
            <h3>{quiz.title}</h3>
            {quiz.description && <p>{quiz.description}</p>}
            <p><strong>عدد الأسئلة:</strong> {quiz.questions.length}</p>
            <Link href={`/quiz/${quiz.id}`}>
              <button className="btn">ابدأ الامتحان</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
