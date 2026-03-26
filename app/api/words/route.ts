import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json([], { status: 401 })

  const words = await prisma.word.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(words)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const body = await request.json()
  const existing = await prisma.word.findFirst({
    where: { dutch: body.dutch, userId: session.user.id }
  })
  if (existing) {
    return NextResponse.json({ error: `Het woord "${body.dutch}" bestaat al` }, { status: 409 })
  }

  const word = await prisma.word.create({
    data: {
      dutch: body.dutch,
      arabicMeaning: body.arabicMeaning,
      otherMeaning: body.otherMeaning || null,
      userId: session.user.id
    }
  })
  return NextResponse.json(word)
}
