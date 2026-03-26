import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { questions: true }
  })
  if (!quiz) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(quiz)
}
