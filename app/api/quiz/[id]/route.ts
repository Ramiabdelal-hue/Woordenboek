import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: { questions: true }
  })
  
  return NextResponse.json(quiz)
}
