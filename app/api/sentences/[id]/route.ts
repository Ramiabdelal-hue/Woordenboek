import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const sentence = await prisma.sentence.findUnique({
    where: { id: params.id },
    include: { word: true }
  })
  if (!sentence) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(sentence)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const sentence = await prisma.sentence.update({
    where: { id: params.id },
    data: {
      dutch: body.dutch,
      arabic: body.arabic,
      wordId: body.wordId
    }
  })
  return NextResponse.json(sentence)
}
