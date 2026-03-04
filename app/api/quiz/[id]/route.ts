import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { questions: true }
  })
  
  return NextResponse.json(quiz)
}
