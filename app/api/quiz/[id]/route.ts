import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const quiz = await prisma.quiz.findUnique({ where: { id: params.id } })
  if (!quiz) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const questions = await prisma.quizQuestion.findMany({ where: { quizId: params.id } })
  return NextResponse.json({ ...quiz, questions })
}
