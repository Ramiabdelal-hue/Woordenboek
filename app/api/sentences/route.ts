import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json([], { status: 401 })

  const sentences = await prisma.sentence.findMany({
    where: { userId: session.user.id },
    include: { word: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(sentences)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const body = await request.json()
  const existing = await prisma.sentence.findFirst({
    where: { dutch: body.dutch, userId: session.user.id }
  })
  if (existing) {
    return NextResponse.json({ error: `De zin bestaat al` }, { status: 409 })
  }

  const sentence = await prisma.sentence.create({
    data: {
      dutch: body.dutch,
      arabic: body.arabic,
      wordId: body.wordId || null,
      userId: session.user.id
    }
  })
  return NextResponse.json(sentence)
}
