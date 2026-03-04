import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  
  const quiz = await prisma.quiz.create({
    data: {
      title: body.quiz.title,
      description: body.quiz.description || null,
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
