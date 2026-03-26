import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const sentence = await prisma.sentence.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: { word: true }
  })
  if (!sentence) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(sentence)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const body = await request.json()
  const sentence = await prisma.sentence.update({
    where: { id: params.id },
    data: { dutch: body.dutch, arabic: body.arabic, wordId: body.wordId || null }
  })
  return NextResponse.json(sentence)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  await prisma.sentence.deleteMany({ where: { id: params.id, userId: session.user.id } })
  return NextResponse.json({ success: true })
}
