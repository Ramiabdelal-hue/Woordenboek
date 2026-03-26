import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession()
  if (!session?.user?.id) return NextResponse.json([], { status: 401 })

  const quizzes = await prisma.quiz.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  })

  // fetch questions for each quiz separately
  const quizzesWithQuestions = await Promise.all(
    quizzes.map(async (quiz) => {
      const questions = await prisma.quizQuestion.findMany({ where: { quizId: quiz.id } })
      return { ...quiz, questions }
    })
  )

  return NextResponse.json(quizzesWithQuestions)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const body = await request.json()

  const quiz = await prisma.quiz.create({
    data: {
      id: crypto.randomUUID(),
      title: body.quiz.title,
      description: body.quiz.description || null,
      userId: session.user.id,
    }
  })

  const questions = await Promise.all(
    body.questions.map((q: any) =>
      prisma.quizQuestion.create({
        data: {
          id: crypto.randomUUID(),
          quizId: quiz.id,
          question: q.question,
          answer: q.answer,
          options: q.options
        }
      })
    )
  )

  return NextResponse.json({ ...quiz, questions })
}
