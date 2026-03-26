import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession()
  if (!session?.user?.id) return NextResponse.json([], { status: 401 })

  const quizzes = await prisma.quiz.findMany({
    where: { userId: session.user.id },
    include: { questions: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(quizzes)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const body = await request.json()

  const quiz = await prisma.quiz.create({
    data: {
      title: body.quiz.title,
      description: body.quiz.description || null,
      userId: session.user.id,
      questions: {
        create: body.questions.map((q: any) => ({
          question: q.question,
          answer: q.answer,
          options: q.options
        }))
      }
    },
    include: { questions: true }
  })

  return NextResponse.json(quiz)
}
